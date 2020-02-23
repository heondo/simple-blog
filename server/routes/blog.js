const express = require('express');
const router = express.Router();
const client = require('../db_connect');

router.use(express.json());

router.post('/comment/', async (req, res, next) => {
    try {
        const {postID, content} = req.body;
        if (!postID || !content.trim() || content.length <= 4) {
            res.status(403);
            throw new Error("Invalid postid or comment content");
        }
        const query = {
            name: "new-comment",
            text: "insert into comments (posts_id, date_created, content) values ($1, NOW(), $2) returning id, date_created, content",
            values: [postID, content]
        }
        const result = await client.query(query);
        if (!result.rowCount) {
            res.statusCode(404);
            throw new Error("Couldn't insert comment into db");
        }
        res.status(200);
        // TODO: I think i am getting scared creating the front end and backend with constantly
        // testing and collaborating, so this should be good practice
        res.json({
            success: true,
            comment: result.rows[0]
        })
    } catch(error) {
        if (!res.statusCode) {
            res.status(500);
        }
        return next(error);
    }
});

router.get('/search/', async (req, res, next) => {
    try {
        const {q: searchTerm} = req.query;
        if (!q.trim()) {
            res.status(404);
            throw new Error('Empty strings not allowed');
        }
        
    } catch (error) {
        if (!res.statusCode) {
            res.status(500);
        }
        return next(error);
    }
})


router.get('/', async (req, res, next) => {
    try {
        const query = {
            name: "get-posts",
            text: "select p.*, c.num_comments from posts as p left join (select posts_id, count(*) as num_comments from comments group by posts_id) as c on c.posts_id = p.id order by date_created desc limit 100",
            values: []
        }
        const result = await client.query(query);
        if (!result.rowCount){
            res.status(404);
            throw new Error('No blogs to show');
        }
        res.status(200);
        res.json({
            success: true,
            blogs: result.rows
        })
    } catch(error) {
        if (!res.statusCode) {
            res.status(500);
        }
        return next(error);
    }
});


router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        if (!id || !parseInt(id)) {
            res.status(404);
            throw new Error("Invalid blog post ID")
        }
        const query = {
            name: `get-blog-${id}`,
            text: "select p.id, p.date_created, p.content, c.comms from posts as p left join (select posts_id, json_agg(json_build_object('id', comments.id, 'date_created', comments.date_created, 'content', comments.content) order by comments.date_created desc) as comms from comments group by posts_id) as c on c.posts_id = p.id where p.id = $1",
            values: [id]
        };
        const result = await client.query(query);
        if (!result.rowCount) {
            res.status(404);
            throw new Error(`Could not retrieve information froma blog with ID: ${id}`)
        }
        res.status(200);
        // console.log(result.rows[0])
        res.json({
            success: true,
            blog: result.rows[0]
        })
    } catch (error) {
        if (!res.statusCode) {
            res.status(500);
        }
        return next(error);
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {blogText} = req.body;
        if (!blogText) {
            res.statusCode(403);
            throw new Error("No text to post")
        }
        const query = {
            name: "new-post",
            text: "insert into posts (date_created, content) values (NOW(), $1) returning id, date_created, content;",
            values: [blogText]
        };
        const result = await client.query(query);
        if (!result.rowCount) {
            res.statusCode(404)
            throw new Error("Failed to insert query")
        }
        res.status(200);
        console.log(result.rows[0])
        res.json({
            success: true,
            blog: result.rows[0]
        })
        // TODO: You need to return the row that was created and send it back to the user...cause
    } catch (error) {
        if (!res.statusCode) {
            res.status(500);
        }
        return next(error);
    }
})


module.exports = router;