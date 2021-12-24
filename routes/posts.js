const router = require('express').Router();
const User = require('../models/User');
const Post = require('../models/Post');

router.post("/", async(req, res) => {
    const newPost = new Post(req.body);
    try {
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (err) {
        res.status(500).json(err);
    }
})


router.put('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {

                const updatePost = await Post.findByIdAndUpdate(req.params.id, {
                    $set: req.body
                }, { new: true });


                res.status(200).json(updatePost)
            } catch (err) {
                res.status(404).json(err);
            }
        } else {
            res.status(401).json("You can update only your post");
        }

    } catch (err) {
        res.status(404).json(err);
    }
})


router.delete('/:id', async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.username === req.body.username) {
            try {
                await post.delete();
                res.status(200).json("Post ")
            } catch (err) {
                res.status(404).json(err);
            }
        } else {
            res.status(401).json("You can delete only your post");
        }

    } catch (err) {
        res.status(404).json(err);
    }
})

router.get("/:id", async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/", async(req, res) => {
    const username = req.query.user;
    const catName = req.query.cat;
    try {
        if (username) {
            posts = await Post.find({ username: username })
        } else if (catName) {
            posts = await Post.find({
                categories: {
                    $in: [catName]
                },
            });
        } else {
            post = Post.find();
        }
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;