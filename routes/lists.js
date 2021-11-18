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
    if (!listName) {
      // if list has no name
      res.redirect("/lists");
    } else {
      const newList = await db.List.create({
        listName,
        userId,
      });
      const lists = await db.List.findAll({
        where: { userId: userId },
      });
      res.render("index", {
        title: "Git It Done",
        lists,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

router.get(
  "/:listId",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const listId = parseInt(req.params.listId, 10);
    console.log(typeof listId);
    const lists = await db.List.findAll({
      where: { userId: userId },
    });
    const tasks = await db.Task.findAll({
      where: { listId: listId },
    });
    res.render("index", {
      title: "Git It Done",
      tasks,
      lists,
      listId,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post(
  "/:listId",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const { taskName } = req.body;
    const listId = parseInt(req.params.listId, 10);
    console.log(req.params);
    const lists = await db.List.findAll({
      where: { userId: userId },
    });

    if (!taskName) {
      res.redirect(`/lists/${listId}`);
    } else {
      const newTask = await db.Task.create({
        taskName,
        listId,
      });
    }
    const tasks = await db.Task.findAll({
      where: { listId: listId },
    });
    res.redirect(`/lists/${listId}`);
  })
);

router.get(
  "/:listId/:taskId",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    // console.log(req.params)
    const taskId = parseInt(req.params.taskId);
    const listId = parseInt(req.params.listId);
    const { userId } = req.session.auth;
    const userTasks = await db.Task.findByPk(taskId, {
      where: { id: taskId },
      include: db.List,
    });

    console.log(userTasks);

    res.render("index", {
      title: "Tasks",
      taskId,
      listId,
      userTasks,
      csrfToken: req.csrfToken(),
    });
  })
);

router.post('/:listId/delete', requireAuth, asyncHandler(async(req,res) => {
  const listId = parseInt(req.params.listId);
  const list = await db.List.findOne({
    where: { id: listId },
  })
  await list.destroy()
  res.redirect('/lists')
}))

router.post('/:listId/edit', requireAuth, asyncHandler(async(req,res) => {

}))

router.post('/:listId/:taskId/delete', requireAuth, asyncHandler(async(req,res) => {
  const listId = parseInt(req.params.listId);
  const { taskId } = req.body
  const taskDestroy = await db.Task.findByPk(taskId)
  await taskDestroy.destroy()
  res.redirect(`/lists/${listId}`)
}))

router.post('/:listId/:taskId/edit', requireAuth, asyncHandler(async(req,res) => {

}))

module.exports = router;
