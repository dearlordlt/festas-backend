module.exports = function (router, Posts) {
    router.route('/posts')
        .post(function (req, res) {

            //EXAMPLE:
            //{"username" : "user1", "message" : "first!"}

            var post = new Posts({
                username: req.body.username,
                message: req.body.message,
                avatar: req.body.avatar
            });

            // save the comment and check for errors
            post.save(function (err) {
                if (err) {
                    console.log('ERROR WRITING post: ' + err);
                    res.status(500).json({error: err});
                } else {
                    console.log('SUCCESS WRITING post: ' + post.message);
                    res.status(200).json({message: 'Post created!', post: post});
                }
            });

        })
        .get(function (req, res) {
            var q;
            if(req.query.skip && req.query.limit) q = Posts.find().skip(parseInt(req.query.skip)).limit(parseInt(req.query.limit));
            else q = Posts.find().skip(0).limit(5).sort(['created_at', 'descending']);
            q.then(function (post) {
                console.log('SUCCESS GETTING posts');
                res.status(200).json(post);
            });
        });

};

