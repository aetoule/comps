require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const massive = require('massive');
const controller = require('./controller');
const session = require('express-session');
const axios = require('axios');

app.use(bodyParser.json());
// app.use(express.static(`${__dirname}/../build`));

massive(process.env.CONNECTION_STRING).then(database => {
    app.set('db', database);
    console.log('database is runnin');
  }).catch(error => {
    console.log('-------------- database issue', error);
});

app.get('/api/got-characters/', controller.getCharacters);
app.get('/api/got-one-character/:id', controller.getOneCharacter);

const PORT = 4003;
  app.listen(PORT, () => console.log(`Server listening on port 4002`));
  