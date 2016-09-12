module.exports = function (router, Character) {
    router.route('/characters')
    // create characters (accessed at POST http://localhost:9001/api/characters)
        .post(function (req, res) {

            //EXAMPLE:
            //{"name" : "User X", "username" : "user1", "password" : "user1", "admin" : "false", "location" : "Vilnius"}

            var character = new Character({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                admin: req.body.admin,
                location: req.body.location,
                meta: req.body.meta,
                created_at: req.body.created_at,
                updated_at: req.body.updated_at
            });

            // save the Character and check for errors
            character.save(function (err) {
                if (err) {
                    console.log('ERROR CREATING Character: ' + err);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS CREATING Character: ' + character.name);
                    res.status(200).json({message: 'Character created!'});
                }
            });

        })
        //Get all users
        .get(function (req, res) {
            Character.find(function (err, character) {
                if (err) {
                    console.log('ERROR GETTING character: ' + err.errmsg);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS GETTING character');
                    res.status(200).json(character);
                }
            });
        });
};