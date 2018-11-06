require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller');
const session = require('express-session');
const axios = require('axios');

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/../build`));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    // cookie: {
    //   maxAge: 1000 * 60 * 60 * 24 * 365
    // }
  }));

  
massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
    console.log('database is runnin');
  }).catch(error => {
    console.log('-------------- database issue', error);
});

app.get(`/callback`, (req, res) => {
    console.log('/callback fired');
    
    const payload = {
      client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      code: req.query.code,
      grant_type: 'authorization_code',
      redirect_uri: `http://${req.headers.host}/callback`
    };
  
    function tradeCodeForAccessToken() {
      return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    }
  
    function tradeAccessTokenForUserInfo(accessTokenResponse) {
      const accessToken = accessTokenResponse.data.access_token;
      return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
    }
  
    function storeUserInfoInDatabase(response) {
      const auth0id = response.data.sub;
      const db = req.app.get('db');
      return db.get_user_author_info(auth0id).then(users => {
        const userArray = {
          name: response.data.name,
          email: response.data.email,
          picture: response.data.picture
        };
        if (users.length) {
          const user = users[0];
          console.log(userArray);
          req.session.user = userArray;
          res.redirect('/');
        } else {
          return db.create_user(auth0id).then(newUser => {
            req.session.user = userArray;
            res.redirect('/');
          }).catch(error => {
            console.log('error in db.create_user', error);
            res.status(500).send('Unexpected error');
          });
        }
      }).catch(error => {
        console.log('error in db.get_user_author_info', error);
        res.status(500).send('Unexpected error');
      });
    }
  
    tradeCodeForAccessToken()
    .then(tradeAccessTokenForUserInfo)
    .then(storeUserInfoInDatabase)
    .catch(error => {
      console.log('error in /callback', error);
      res.status(500).send('Unexpected error');
    });
  });
  
  app.post('/api/register-user', controller.postUser);
  app.post('/api/logging-in-user', controller.postLogin);
 
app.get('/api/got-characters/', controller.getCharacters);
app.get('/api/got-one-character/:id', controller.getOneCharacter);
  
  
  
  app.post('/api/logout', (req, res) => {
      req.session.destroy();
      res.send('session destroyed');
  })
  
  // app.get('/api/memes', memesController.getDb);
  app.get('/api/user-data', (req, res) => {
    res.json(req.session.user );
  });

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 4003;
  app.listen(PORT, () => console.log(`Server listening on port 4002`));
  