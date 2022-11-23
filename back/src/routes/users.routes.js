const express = require("express");
const router = express.Router();

const passport = require("passport");
require("../middlewares/auth.middleware")(passport);

const userControllers = require("../controllers/users.controllers");

// USER    --> /user -> PUT->updateUser (addFollower*)| GET->getUser(getFollowers) | DELETE->deleteUser
// ADMIN   --> /admin -> GET->getAllUsers | PUT->`:id`updateUser | GET->`:id`getUser | DELETE->`:id` deleteUser

const path = "/api/user";

//ruta para pedir todos los user
router.get(`${path}`, userControllers.getAllUsers);

//ruta para pedir un user(name)
router.get(`${path}/one`, userControllers.getUserByName);

//ruta para postear un user
router.post(`${path}/register`, userControllers.register);
router.post(`${path}/login`, userControllers.login);

router.put(`${path}/update`, userControllers.editUser);

//ruta para borrar un user
router.put(`${path}`, userControllers.deleteUser);

router
  .route(`${path}/me`)
  .get(
    passport.authenticate("jwt", { session: false }),
    userControllers.getMyUser
  );
// POST hábito a un user
// incorpora hábitos al user por ID de hábito
router.post(`${path}/:id/productos`, userControllers.createHabit);
//ruta para pedir un user(id)
router.route(`${path}/:id`).get(userControllers.getUserById);

router
  .route(`${path}/google`)
  .get(passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/api/user/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  }
);

module.exports = router;
