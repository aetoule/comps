module.exports = {
    postUser: (req, res) => {
        const dbInstance = req.app.get('db');
            dbInstance.create_user()
            .then(stuff => res.status(200).send(stuff) )
            .catch(err => {
                res.status(500).send({errorMessage: "Error with creating user."}, err);
            });
       },
       postLogin: (req, res) => {
        const dbInstance = req.app.get('db');
            dbInstance.create_user()
            .then(stuff => res.status(200).send(stuff) )
            .catch(err => {
                res.status(500).send({errorMessage: "Error with creating user."}, err);
            });
        },
    getCharacters: (req, res) => {
        const dbInstance = req.app.get('db');
        dbInstance.get_characters()
        .then(stuff => res.status(200).send(stuff) )
            .catch(err => {
                res.status(500).send('err', err);
            });
    },
    getOneCharacter: (req, res) => {
        const dbInstance = req.app.get('db');
        let {id} = req.params;
        dbInstance.get_one_character(id)
        .then(character => {
            res.status(200).send(character)
        }).catch(err => {
            res.status(500).send(err)
        })
    }
}