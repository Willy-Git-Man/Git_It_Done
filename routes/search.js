const express = require("express");
const { Op } = require("sequelize");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

const searchRouter = express.Router();

searchRouter.post('/', asyncHandler(async(req, res, next) => {
    const { taskName } = req.body;
    const tasks = await db.Task.findAll({
        where: {
            taskName: {
                [Op.iLike]:`%${taskName}%`
            }
        }
    })
    res.render('index',
    {
        title: 'Git-It-Done',
        tasks,
        lists: {}
    });
}));

module.exports = searchRouter;
