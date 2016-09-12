module.exports = function (router, Comment) {
    router.route('/comments')
        .post(function (req, res) {

            //EXAMPLE:
            //{"userid" : "0", "username" : "user1", "message" : "first!", "parentId" : "null", "topicId" : "spam"}

            var comment = new Comment({
                userid: req.body.userid,
                username: req.body.username,
                message: req.body.message,
                likes: 0,
                dislikes: 0,
                parentId: req.body.parentId,
                topicId: req.body.topicId,
                isDeleted: false
            });

            // save the comment and check for errors
            comment.save(function (err) {
                if (err) {
                    console.log('ERROR WRITING COMMENT: ' + err);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS WRITING COMMENT: ' + comment.message);
                    res.status(200).json({message: 'Comment created!', comment: comment});
                }
            });

        })
        .get(function (req, res) {
            Comment.find(function (err, comment) {
                if (err) {
                    console.log('ERROR GETTING comment: ' + err.errmsg);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS GETTING comment');
                    res.status(200).json(comment);
                }
            });
        });

    router.route('/comments/:topic')
    // get comments by topic (accessed at GET http://localhost:9001/api/comments/:topic)
        .get(function (req, res) {
            Comment.find({topicId: req.params.topic, isDeleted: false}, function (err, comments) {
                if (err) {
                    console.log('ERROR GETTING COMMENTS: ' + err.errmsg);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS GETTING COMMENTS');
                    res.status(200).json(comments);
                }
            });
        })
};
