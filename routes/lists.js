const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const { requireAuth } = require("../auth");

// GET ALL LISTS

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
    const taskCount = await db.Task.count({
      include: {
        model: db.List,
        required: true,
        where: { userId: userId }
      },
    });
    const completedCount = await db.Task.count({
      where: { taskStatus: true },
      include: {
        model: db.List,
        required: true,
        where: { userId: userId }
      },
    });
    res.render("index", {
      title: "Git It Done",
      lists,
      taskCount,
      completedCount,
      csrfToken: req.csrfToken(),
    });
  })
);

// CREATE A NEW LIST

router.post(
  "/",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const { listName } = req.body;
    if (!listName) {
      // if list has no name
      res.redirect("/lists");
    } else {
      await db.List.create({
        listName,
        userId,
      });
      const lists = await db.List.findAll({
        where: { userId: userId },
        order: ['id']
      });
      const taskCount = await db.Task.count({
        include: {
          model: db.List,
          required: true,
          where: { userId: userId }
        },
      });
      const completedCount = await db.Task.count({
        where: { taskStatus: true },
        include: {
          model: db.List,
          required: true,
          where: { userId: userId }
        },
      });
      res.render("index", {
        title: "Git It Done",
        lists,
        taskCount,
        completedCount,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

// GET ALL TASKS FOR A LIST

router.get(
  "/:listId",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const listId = parseInt(req.params.listId, 10);
    const list = await db.List.findByPk(listId);
    const listName = list.listName;
    const lists = await db.List.findAll({
      where: { userId: userId },
      order: ['id']
    });
    const tasks = await db.Task.findAll({
      where: { listId: listId },
      order: [
        ['taskStatus'],
        ['id'],
      ]
    });
    const isListSummary = true;
    const taskCount = tasks.length;
    const completedCount = await db.Task.count({
      where: {
        listId: listId,
        taskStatus: true
       }
    });
    res.render("index", {
      title: "Git It Done",
      tasks,
      lists,
      listId,
      listName,
      isListSummary,
      taskCount,
      completedCount,
      csrfToken: req.csrfToken(),
    });
  })
);

// ADD A TASK TO A LIST

router.post(
  "/:listId",
  requireAuth,
  csrfProtection,
  asyncHandler(async (req, res) => {
    const { userId } = req.session.auth;
    const { taskName } = req.body;
    const listId = parseInt(req.params.listId, 10);
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
      order: [
        ['taskStatus'],
        ['id'],
      ]
    });
    res.redirect(`/lists/${listId}`);
  })
);

// GET THE DETAILS FOR A TASK

router.get(
  "/:listId/:taskId(\\d+)",
  csrfProtection,
  requireAuth,
  asyncHandler(async (req, res) => {
    const taskId = parseInt(req.params.taskId);
    const listId = parseInt(req.params.listId);
    const { userId } = req.session.auth;
    const task = await db.Task.findByPk(taskId);
    const lists = await db.List.findAll({
      where: { userId: userId },
      order: ['id'],
    });
    const tasks = await db.Task.findAll({
      where: { listId },
      order: [
        ['taskStatus'],
        ['id'],
      ]
    });
    const isTaskDetails = true;
    res.render("index", {
      title: "Tasks",
      taskId,
      listId,
      lists,
      tasks,
      task,
      isTaskDetails,
      csrfToken: req.csrfToken(),
    });
  })
);

// DELETE A LIST

router.get('/:listId/delete', requireAuth, asyncHandler(async (req, res) => {
  const { userId } = req.session.auth;
  const listId = parseInt(req.params.listId);
  const list = await db.List.findByPk(listId)
  await list.destroy()
  const taskCount = await db.Task.count({
    include: {
      model: db.List,
      required: true,
      where: { userId: userId }
    },
  });
  const completedCount = await db.Task.count({
    where: { taskStatus: true },
    include: {
      model: db.List,
      required: true,
      where: { userId: userId }
    },
  });
  return res.json({ taskCount, completedCount })
}))

//  GET FORM TO EDIT A LIST

router.get('/:listId/edit', csrfProtection, requireAuth, asyncHandler(async (req, res) => {
  const { userId } = req.session.auth;
  const listId = parseInt(req.params.listId);
  const list = await db.List.findByPk(listId);
  const listName = list.listName
  const lists = await db.List.findAll({
    where: { userId: userId },
    order: ['id'],
  });
  const tasks = await db.Task.findAll({
    where: { listId: listId },
    order: [
      ['taskStatus'],
      ['id'],
    ]
  });
  const isEditList = true;
  res.render('index', {
    title: "Edit List",
    lists,
    tasks,
    listId,
    listName,
    isEditList,
    csrfToken: req.csrfToken(),
  })
}))

//  SUBMIT FORM TO EDIT A LIST

router.post('/:listId/edit', csrfProtection, requireAuth, asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.listId);
  const list = await db.List.findByPk(listId);
  const { listName } = req.body;
  if (listName) {
    await list.update({
      listName
    })
  }
  res.redirect(`/lists/${listId}`)
}))

// DELETE A TASK

router.get('/:listId/:taskId/delete', requireAuth, asyncHandler(async (req, res) => {
  const listId = parseInt(req.params.listId);
  const taskId = parseInt(req.params.taskId);
  const task = await db.Task.findByPk(taskId)
  await task.destroy()
  const list = await db.List.findByPk(listId);
  const listName = list.listName;
  const tasks = await db.Task.findAll({
    where: { listId: listId }
  });
  const taskCount = tasks.length;
  const completedCount = await db.Task.count({
    where: {
      listId: listId,
      taskStatus: true
     }
  });
  return res.json({ taskCount, completedCount, listName })
}))

// GET FORM TO EDIT A TASK

router.get('/:listId/:taskId/edit', csrfProtection, requireAuth, asyncHandler(async (req, res) => {
  const { userId } = req.session.auth;
  const taskId = parseInt(req.params.taskId);
  const listId = parseInt(req.params.listId);
  const isEditTask = true;
  const lists = await db.List.findAll({
    where: { userId: userId },
    order: ['id'],
  });
  const tasks = await db.Task.findAll({
    where: { listId: listId },
    order: [
      ['taskStatus'],
      ['id'],
    ]
  });
  const task = await db.Task.findByPk(taskId);
  res.render(`index`, {
    title: "Edit Task",
    taskId,
    isEditTask,
    lists,
    tasks,
    listId,
    task,
    csrfToken: req.csrfToken(),
  })
}))

//  SUBMIT FORM TO EDIT A TASK

router.post('/:listId/:taskId/edit', csrfProtection, requireAuth, asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = await db.Task.findByPk(taskId)
  const listId = parseInt(req.params.listId);
  const taskName = req.body.taskName || task.taskName;
  const taskStatus = req.body.taskStatus || task.taskStatus;
  const taskDate = req.body.taskDate || task.taskDate;
  const taskNotes = req.body.taskNotes || task.taskNotes;

  if (taskName) {
    await task.update({
      taskName,
      taskStatus,
      taskDate,
      taskNotes
    })
  }
  res.redirect(`/lists/${listId}`)
}))

// MARK COMPLETED TASK AS INCOMPLETE

router.get('/:listId/:taskId/incomplete', requireAuth, asyncHandler(async (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const task = await db.Task.findByPk(taskId)
  const listId = parseInt(req.params.listId);
  await task.update({
    taskStatus: false
  })
  res.redirect(`/lists/${listId}`)
}))

module.exports = router;
