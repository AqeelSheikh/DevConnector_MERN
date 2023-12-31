const express = require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
const {check,validationResult}=require('express-validator');
const request=require('request');
const config=require('config');
const Profile=require('../../models/Profile');
const User=require('../../models/User');
const Post=require('../../models/Post');
// @route POST api/posts
// @desc  Create a post
// @access public
router.post('/',[auth,[
check('text','text is required')
.not()
.isEmpty()
]
],
async (req,res)=>{
    const errors=validationResult(req);
    if (!errors.isEmpty) {
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const user=await User.findById(req.user.id).select('-password');
        const newPost=new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        })
        const post=await newPost.save();
        res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
   
}

);
// @route Get api/posts
// @desc   get all posts
// @access private
router.get('/',auth, async(req,res)=>{
try {
   const posts=await Post.find().sort({date:-1});
   res.json(posts); 
} catch (err) {
    console.error(err.message);
    res.status(500).send('server error');
}
})
// @route Get api/posts/:id
// @desc   get  post by ID
// @access private
router.get('/:id',auth, async(req,res)=>{
try {
   const post=await Post.findById(req.params.id);
   if (!post) {
    return res.status(404).json({msg:'not found'});
   }
   res.json(post);  
} catch (err) {
    console.error(err.message);
    if (err.kind===('ObjectID')) {
     return res.status(404).json({msg:'not found'});
    }
    res.status(500).send('server error');
}
});
// @route   Delete api/posts:id
// @desc   delete all posts
// @access private
router.delete('/:id',auth, async(req,res)=>{
    try {
       const post=await Post.findOneAndDelete({
        _id:req.params.id,
        user:req.user.id
    });
       if (!post) {
        return res.status(404).json({msg:'not found'});
       }
       //check user
       if (post.user.toString()!==req.user.id) {
        return res.status(401).json({msg:'User not authorized'});
       }
     
       res.json({msg:'post removed'});

    } catch (err) {
        console.error(err.message);
        if (err.kind===('ObjectID')) {
            return res.status(404).json({msg:'Post not found'});
           }
        res.status(500).send('server error');
    }
    });
// @route   PUT api/posts/like/:id
// @desc   like posts
// @access private
    router.put('/like/:id',auth,async(req,res)=>{
        try {
            const post=await Post.findById( req.params.id);
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
              }
            //check if the post has already been liked
            if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0){
                return res.status(400).json({msg:"Post has already been liked"})
            }
            post.likes.unshift({user:req.user.id});
            await post.save();
            res.json(post.likes);
            
        } catch (err) {
            console.error(err.message).send('server error');
        }
    })
// @route   PUT api/posts/unlike/:id
// @desc   unlike posts
// @access private
    router.put('/unlike/:id',auth,async(req,res)=>{
        try {
            const post=await Post.findById( req.params.id);
            if (!post) {
                return res.status(404).json({ msg: 'Post not found' });
              }
            //check if the post has already been liked
            if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0){
                return res.status(400).json({msg:"Post has not yet liked"})
            }
            // get remove index
            const removeIndex=post.likes.map(like=>like.user.toString()).indexOf(req.user.id);
            post.likes.splice(removeIndex,1);
            await post.save();
            res.json(post.likes);
            
        } catch (err) {
            console.error(err.message).send('server error');
        }
    });
// @route POST api/posts/comment
// @desc  Create a comment/:id
// @access private
router.post('/comment/:id',[auth,[
    check('text','text is required')
    .not()
    .isEmpty()
    ]
    ],
    async (req,res)=>{
        const errors=validationResult(req);
        if (!errors.isEmpty) {
            return res.status(400).json({errors:errors.array()});
        }
        try {
            const user=await User.findById(req.user.id).select('-password');
            const post=await Post.findById(req.params.id);
            const newComment={
                text:req.body.text,
                name:user.name,
                avatar:user.avatar,
                user:req.user.id
            }
            post.comments.unshift(newComment);
            await post.save();
            res.json(post.comments);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
       
    }
    
    );
    // @route POST api/posts/comment/:id/comment_id
// @desc  delete a comment
// @access private
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
    try {
        const post=await Post.findById(req.params.id);
        //pull out comment
        const comment=post.comments.find(comment=>comment.id===req.params.comment_id);
        // make sure comment exists
        if (!comment) {
            return res.status(404).json({msg:'comment does not exist'});
        }
        // check user
        if (comment.user.toString() !== req.user.id) {
            return res.status(401).json({msg:'user not authorized'});
        }
        // get remove index
        const removeIndex=post.comments.map(comment=>comment.user.toString()).indexOf(req.user.id);
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error');
    }
})
module.exports=router;