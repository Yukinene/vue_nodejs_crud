const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/auth");

const router = express.Router();

/*CRUD
Create*/
router.post("/",auth,async (require,respond) => {
    const {title,content} = require.body;
    try {
        const post = await Post.create({
            title,content,userId:require.userId
        });
        respond.json(post);
    } catch (error) {
        respond.status(400).json({
            error: "สร้างไม่สำเร็จ"
        })
    }
})
//Read Index
router.post("/",auth,async (require,respond) => {
    const post = await Post.findAll({
        where:{
            userId:require.userId
        }
    });
    respond.json(post);
})
//Read post
router.post("/:id",auth,async (require,respond) => {
    const post = await Post.findOne({
        where:{
            id: require.params.id,
            userId:require.userId
        }
    });
    if (!post) {
        return respond.status(404).json({
            errer: "ไม่พบ"
        });
    }
    respond.json(post);
})
//Update
router.put("/",auth,async (require,respond) => {
    const post = await Post.findOne({
        where:{
            id: require.params.id,
            userId:require.userId
        }
    });
    if (!post) {
        return respond.status(404).json({
            errer: "ไม่พบ"
        });
    }

    const {title,content} = require.body;
    post.title = title;
    post.content = content;
    await post.save();

    respond.json(post);
})
//Delete
router.delete("/:id",auth,async (require,respond) => {
    const post = await Post.findOne({
        where:{
            id: require.params.id,
            userId:require.userId
        }
    });
    if (!post) {
        return respond.status(404).json({
            errer: "ไม่พบ"
        });
    }

    await post.destroy();

    respond.json(post);
})

module.exports = router;