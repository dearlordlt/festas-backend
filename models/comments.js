var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var commentsSchema = new Schema({
    userid: String,
    username: String,
    message: String,
    likes: Number,
    dislikes: Number,
    parentId: String,
    topicId: String,
    isDeleted: Boolean,
    created_at: Date,
    updated_at: Date
});

// on every save, add the date
commentsSchema.pre('save', function(next) {
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
var Comment = mongoose.model('Comment', commentsSchema);

// export model
module.exports = Comment;