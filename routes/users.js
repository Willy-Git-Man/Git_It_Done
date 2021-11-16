const express = require("express");
const router = express.Router();
const db = require("../db/models");
const bcrypt = require("bcryptjs");
const { csrfProtection, asyncHandler } = require("./utils");
const { loginUser, logOutUser, requireAuth } = require("../auth");

const { check, validationResult } = require("express-validator");

const userValidators = [
  check("firstName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for First Name")
    .isLength({ max: 25 })
    .withMessage("First Name must not be more than 25 characters long"),

  check("lastName")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Last Name")
    .isLength({ max: 25 })
    .withMessage("Last Name must not be more than 25 characters long"),

  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Email Address")
    .isLength({ max: 50 })
    .withMessage("Email Address must not be more than 50 characters long")
    .isEmail()
    .withMessage("Email Address is not a valid email")
    .custom((value) => {
      return db.User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Password")
    .isLength({ max: 50 })
    .withMessage("Password must not be more than 50 characters long")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, "g")
    .withMessage(
      'Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'
    ),

  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Please provide a value for Confirm Password")
    .isLength({ max: 50 })
    .withMessage("Confirm Password must not be more than 50 characters long")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirm Password does not match Password");
      }
      return true;
    }),
];

/* GET users listing. */
router.get("/login", csrfProtection, (req, res, next) => {
  res.render("login");
  // res.send('respond with a resource');
});

router.get("/register", csrfProtection, (req, res, next) => {
  const user = db.User.build();
  res.render("register", {
    title: "Register",
    user,
    csrfToken: req.csrfToken(),
  });
});

router.post(
  "/register",
  csrfProtection,
  userValidators,
  asyncHandler(async (req, res, next) => {
    const { firstName, lastName, email, password } = req.body;
    const user = await db.User.build({ firstName, lastName, email });
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      const hashPassword = await bcrypt.hash(password, 10);
      user.hashedPassword = hashPassword;
      await user.save();
      loginUser(req, res, user);
      return res.redirect("/users/login");
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      console.log(errors)
      res.render("register", {
        title: "Register",
        user,
        errors,
        csrfToken: req.csrfToken(),
      });
    }
  })
);

module.exports = router;
