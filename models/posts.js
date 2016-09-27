var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var postsSchema = new Schema({
    username: String,
    message: String,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
postsSchema.pre('save', function(next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    // this.updated_at = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.created_at)
        this.created_at = currentDate;

    next();
});

//create model for user
var Posts = mongoose.model('Posts', postsSchema);

// export model
module.exports = Posts;