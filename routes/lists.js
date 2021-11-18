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
      order: ['id']
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
        order: ['id']
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
      order: ['id']
    });
    const tasks = await db.Task.findAll({
      where: { listId: listId },
      order: ['id']
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
      order: ['id']
    });

    if (!taskName) {
      res.redirect(`/lists/${listId}`);
    } else {
      const newTask = await db.Task.create({
        taskName,
        listId,
        taskStatus: false,
      });
    }
    const tasks = await db.Task.findAll({
      where: { listId: listId },
      order: ['id']
    });
    res.redirect(`/lists/${listId}`);
  })
);

router.get(
  "/:listId/:taskId(\\d+)",
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
      order: ['id']
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
    order: ['id']
  })
  await list.destroy()
  res.redirect('/lists')
}))

router.get('/:listId/edit', csrfProtection, requireAuth, asyncHandler(async(req,res) => {
  const listId = parseInt(req.params.listId);
  const lists = await db.List.findAll({
    order: ['id'],
  });
  const tasks = await db.Task.findAll({
    order: ['id'],
  });
  const isEditList = true;
  res.render('index', {
    title: "Edit List",
    lists,
    tasks,
    listId,
    isEditList,
    csrfToken: req.csrfToken(),
  })
}))

router.post('/:listId/edit', csrfProtection, requireAuth, asyncHandler(async(req,res) => {
  const listId = parseInt(req.params.listId);
  const list = await db.List.findByPk(listId);
  const {listName} = req.body;
  if (listName){
    await list.update({
      listName
    })
  }
  res.redirect(`/lists/${listId}`)
}))

router.post('/:listId/:taskId/delete', requireAuth, asyncHandler(async(req,res) => {
  const listId = parseInt(req.params.listId);
  const { taskId } = req.body
  // const { taskId } = parseInt(req.params.taskId);
  const taskDestroy = await db.Task.findByPk(taskId)
  await taskDestroy.destroy()
  res.redirect(`/lists/${listId}`)
}))

router.get('/:listId/:taskId/edit', csrfProtection, requireAuth, asyncHandler(async(req,res) => {
  const taskId = parseInt(req.params.taskId);
  const listId = parseInt(req.params.listId);
  const isEditTask = true;
  const lists = await db.List.findAll({
    order: ['id'],
  });
  const tasks = await db.Task.findAll({
    where: {listId},
    order: ['id'],
  });

  res.render(`index`, {
    title: "Edit Task",
    taskId,
    isEditTask,
    lists,
    tasks,
    listId,
    csrfToken: req.csrfToken(),
  })
}))

router.post('/:listId/:taskId/edit', csrfProtection, requireAuth, asyncHandler(async(req,res) => {
  const taskId = parseInt(req.params.taskId);
  const task = await db.Task.findByPk(taskId)
  const listId = parseInt(req.params.listId);
  const taskName = req.body.taskName || task.taskName;
  const taskStatus = req.body.taskStatus || task.taskStatus;
  const taskDate = req.body.taskDate|| task.taskDate;
  const taskNotes = req.body.taskNotes || task.taskNotes;

  if (taskName){
    await task.update({
      taskName,
      taskStatus,
      taskDate,
      taskNotes
    })
  }
  res.redirect(`/lists/${listId}`)
}))

module.exports = router;
