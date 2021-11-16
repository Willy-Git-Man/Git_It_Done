const express = require('express');
const { locals } = require('../app');
const router = express.Router();
const { requireAuth } = require('../auth');
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

/* GET home page. */


router.get('/', requireAuth, csrfProtection, asyncHandler(async(req, res, next) => {
  // const tasks = await db.Task.findAll();
  // console.log(tasks)
  // res.render('index', {
  //     tasks,
  //     csrfToken: req.csrfToken()
  // })

    res.render('login', { title: 'Git It Done' });
}));

module.exports = router;
