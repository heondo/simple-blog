const express = require('express');
const router = express.Router();
const client = require('../db_connect');

router.use(express.json());

router.post('/', async (req, res, next) => {
    try {
        const {blogText} = req.body;
        if (!blogText) {
            res.statusCode(403);
            throw new Error("No text to post")
        }
        // console.log(blogText)
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
        console.log(result)
    } catch (error) {
        if (!res.statusCode) {
            res.status(500);
        }
        return next(error);
    }
})

module.exports = router;