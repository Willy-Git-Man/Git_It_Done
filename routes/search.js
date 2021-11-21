const express = require("express");
const { Op } = require("sequelize");

const db = require("../db/models");
const { csrfProtection, asyncHandler } = require('./utils');

const searchRouter = express.Router();

searchRouter.post('/', csrfProtection, asyncHandler(async(req, res, next) => {
    const { taskName } = req.body;
    const { userId } = req.session.auth;
    const isSearch = true;
    const tasks = await db.Task.findAll({
        where: {
            taskName: {
                [Op.iLike]:`%${taskName}%`
            }
        }
    })
    const lists = await db.List.findAll({
        where: { userId: userId },
        order: ['id'],
      });
    res.render('index',
    {
        title: 'Git-It-Done',
        tasks,
        lists,
        isSearch,
        csrfToken: req.csrfToken()
    });
}));

module.exports = searchRouter;
