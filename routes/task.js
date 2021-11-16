const express = require("express");
const { requireAuth } = require('../auth')
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');
const taskRouter = express.Router();

taskRouter.get('/', csrfProtection, asyncHandler(async(req, res, next) => {
    const tasks = await db.Task.findAll();
    console.log(tasks)
    res.render('task', {
        tasks,
        csrfToken: req.csrfToken()
    })
}))

module.exports = taskRouter;