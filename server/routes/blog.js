const express = require('express');
const router = express.Router();
const client = require('../db_connect');

router.use(express.json());

router.post('/', async (req, res, next) => {
    try {
        const {blogText} = req.body;
        console.log(blogText)
    } catch (error) {
        if (!res.statusCode) {
            res.status(404);
        }
        next(error);
    }
})

module.exports = router;