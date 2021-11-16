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
// router.get("/login", csrfProtection, (req, res, next) => {
//   res.render("login");
//   // res.send('respond with a resource');
// });

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

const loginValidators = [
  check('email')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Email Address'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a value for Password'),
];
router.get("/login", csrfProtection, (req, res, next) => {
  res.render("login",
    {
      title: "Login",
      csrfToken: req.csrfToken(),
    });
});
router.post('/login', loginValidators, csrfProtection,
  asyncHandler(async (req, res) => {
    const {
      email,
      password,
    } = req.body;
    let errors = [];
    const validatorErrors = validationResult(req);
    if (validatorErrors.isEmpty()) {
      // Attempt to get the user by their email address.
      const user = await db.User.findOne({ where: { email } });
      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password.
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatch) {
          // If the password hashes match, then login the user
          // and redirect them to the default route.
          loginUser(req, res, user);
          return res.redirect('/');
        }
      }
      // Otherwise display an error message to the user.
      errors.push('Login failed for the provided email address and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }
    res.render('login', {
      title: 'Login',
      email,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));

router.post("/logout", (req, res) => {
  logOutUser(req, res);
  res.redirect('/users/login');
});















module.exports = router;
