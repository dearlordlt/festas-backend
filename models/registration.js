var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var regSchema = new Schema({
    vardas: String,
    pastas: String,
    lytis: String,
    titulas: String,
    atvykstu: String,
    kunas: String,
    apigosiki: String,
    pasiulymas: String,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
regSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

//create model for user
var Registration = mongoose.model('Registration', regSchema);

Registration.create({
    vardas: 'First',
    pastas: 'first@first.lt',
    lytis: 'first',
    titulas: 'first',
    atvykstu: 'first',
    kunas: 'first',
    apigosiki: 'first',
    pasiulymas: 'first'
}, function (err, small) {
  if (err) return handleError(err);
  // saved!
})

// export model
module.exports = Registration;