module.exports = function (router, Registration) {
    router.route('/registration')
    // create characters (accessed at POST http://localhost:9001/api/registration)
        .post(function (req, res) {

            //EXAMPLE:
            //{"name" : "User X", "username" : "user1", "password" : "user1", "admin" : "false", "location" : "Vilnius"}

            var registration = new Registration({
                vardas: req.body.vardas,
                pastas: req.body.pastas,
                lytis: req.body.lytis,
                titulas: req.body.titulas,
                atvykstu: req.body.atvykstu,
                kunas: req.body.kunas,
                apigosiki: req.body.apigosiki,
                pasiulymas: req.body.pasiulymas,
            });

            // save the Registration and check for errors
            Registration.save(function (err) {
                if (err) {
                    console.log('ERROR CREATING Registration: ' + err);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS CREATING Registration: ' + registration.name);
                    res.status(200).json({message: 'Registration created!'});
                }
            });

        })
        //Get all Registrations
        .get(function (req, res) {
            Registration.find(function (err, registration) {
                if (err) {
                    console.log('ERROR GETTING registration: ' + err.errmsg);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS GETTING registration');
                    res.status(200).json(registration);
                }
            });
        });
};