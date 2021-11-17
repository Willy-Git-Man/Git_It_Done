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
      where: { userId: userId },
    });
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
    console.log(listName, "hello");
    if (!listName) { // if list has no name
      res.redirect('/lists');
    } else {
      const newList = await db.List.create({
        listName,
        userId,
      });
      const lists = await db.List.findAll({
        where: { userId: userId }
      });
      res.render('index', { title: 'Git It Done', lists, csrfToken: req.csrfToken(), });
    }
  })
);

router.get(
  '/:listId',
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    // Selects a list
    // Only shows tasks on that list
  })
)

router.post(
  '/:listId',
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    // Creates new task for that list
  })
)

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

module.exports = router;
