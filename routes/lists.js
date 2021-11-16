const express = require("express");
const router = express.Router();
const db = require("../db/models");
const { csrfProtection, asyncHandler } = require("./utils");
const { requireAuth } = require('../auth')

router.get('/', requireAuth, asyncHandler(async (req,res) => {
  const { userId } = req.session.auth;
  const lists = await db.List.findAll({
    where: {userId: 1} // re-test when we have more lists
  });
  res.render('index', { title: 'Git It Done', lists });
}));

router.post('/', csrfProtection, requireAuth, asyncHandler(async (req,res) => {
  const { userId } = req.session.auth;
  const {
    listName
  } = req.body;
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
}));
//test
//test2
module.exports = router;
