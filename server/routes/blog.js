const express = require('express');
const router = express.Router();
const client = require('../db_connect');

router.use(express.json());

router.get('/', async (req, res, next) => {
    try {
        const query = {
            name: "get-posts",
            text: "select * from posts order by date_created desc limit 100",
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
            text: "insert into posts (date_created, content) values (NOW(), $1);",
            values: [blogText]
        };
        const result = await client.query(query);
        if (!result.rowCount) {
            res.statusCode(404)
            throw new Error("Failed to insert query")
        }
    } catch (error) {
        if (!res.statusCode) {
            res.status(500);
        }
        return next(error);
    }
})

module.exports = router;