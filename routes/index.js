const express = require('express');
const { locals } = require('../app');
const router = express.Router();
const { requireAuth } = require('../auth')

/* GET home page. */


router.get('/', requireAuth, (req, res, next) => {
    res.render('index', { title: 'Git It Done' });
});



module.exports = router;
