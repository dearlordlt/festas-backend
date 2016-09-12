module.exports = function (router, User) {
    router.route('/users')
    // create users (accessed at POST http://localhost:9001/api/users)
        .post(function (req, res) {

            //EXAMPLE:
            //{"name" : "User X", "username" : "user1", "password" : "user1", "admin" : "false", "location" : "Vilnius"}

            var user = new User({
                name: req.body.name,
                username: req.body.username,
                password: req.body.password,
                admin: req.body.admin,
                location: req.body.location,
                meta: req.body.meta,
                created_at: req.body.created_at,
                updated_at: req.body.updated_at
            });

            // save the user and check for errors
            user.save(function (err) {
                if (err) {
                    console.log('ERROR CREATING USER: ' + err);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS CREATING USER: ' + user.name);
                    res.status(200).json({message: 'User created!'});
                }
            });

        })
        //Get all users
        .get(function (req, res) {
            User.find(function (err, users) {
                if (err) {
                    console.log('ERROR GETTING USERS: ' + err.errmsg);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS GETTING USERS');
                    res.status(200).json(users);
                }
            });
        });

    router.route('/users/:user_id')
    // get user by id (accessed at GET http://localhost:9001/api/users/:user_id)
        .get(function (req, res) {
            User.findById(req.params.user_id, function (err, user) {
                if (err) {
                    console.log('ERROR GETTING USER: ' + err.errmsg);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS GETTING USER'.green + (' id:' + req.params.user_id));
                    res.status(200).json(user);
                }
            });
        })
        .put(function (req, res) {

            // update user by id
            User.findById(req.params.user_id, function (err, user) {

                if (err) {
                    console.log('ERROR UPDATING USER: ' + err.errmsg);
                    res.status(500).json({error: err});
                    return 0;
                }

                for (var key in req.body) {
                    user[key] = req.body[key];
                }

                // save user
                user.save(function (err) {
                    if (err) {
                        console.log('ERROR UPDATING USER: ' + err.errmsg);
                        res.status(500).json({error: err});
                    } else {
                        console.log('SUCCESS UPDATING USER');
                        res.status(200).json({success: 'User is updated'});
                    }
                });

            });
        })
        .delete(function (req, res) {
            User.remove({
                _id: req.params.user_id
            }, function (err, user) {
                if (err) {
                    console.log('ERROR DELETING USER: ' + err.errmsg);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS DELETING USER'.green + (' id:' + req.params.user_id));
                    res.status(200).json({message: 'Successfully deleted user'});
                }
            });
        });
};