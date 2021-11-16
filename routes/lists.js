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

module.exports = router;
