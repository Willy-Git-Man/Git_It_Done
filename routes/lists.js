const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const { requireAuth } = require("../auth");

router.get(
  "/",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const lists = await db.List.findAll({
      where: { userId: 1 }, // re-test when we have more lists
    });
    console.log(lists);
    res.render("index", {
      title: "Git It Done",
      lists,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const { listName } = req.body;
    const newList = await db.List.create({
      listName,
      userId,
    });
    res.send(newList);
    // console.log(newList);
    // const lists = await db.List.findAll({
    //   where: {userId: 1} // re-test when we have more lists
    // });
    // res.render('index', { title: 'Git It Done', lists, csrfToken: req.csrfToken(), });
  })
);

router.get(
  "/:listId/:taskId",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    // console.log(req.params)
    const taskId = parseInt(req.params.taskId);
    const listId = parseInt(req.params.taskId)
    const { userId } = req.session.auth;
    const userTasks = await db.Task.findByPk(taskId, {
      where: { id: taskId },
      include: db.List,
    });

    console.log(userTasks)

    res.render("index", {
      title: "Tasks",
      taskId,
      listId,
      userTasks,
      csrfToken: req.csrfToken()
    });
  })
);
//test
//test2
module.exports = router;
