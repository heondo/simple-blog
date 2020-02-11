const express = require('express');
const router = express.Router();
const client = require('../db_connect');

router.use(express.json());

router.post('/', async (req, res, next) => {
    try {
        console.log('what is up')   
    } catch (error) {
        next(error);
    }
})

module.exports = router;