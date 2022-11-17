const express = require("express");

const router = express.Router();

const UsersDaoMongoDB = require("../DAOs/usersDaoMongoDb");
const usersApi = new UsersDaoMongoDB();
const jwt = require('jsonwebtoken')
const { hashPassword } = require("../utils/crypt");

// USER    --> /user -> PUT->updateUser (addFollower*)| GET->getUser(getFollowers) | DELETE->deleteUser
// ADMIN   --> /admin -> GET->getAllUsers | PUT->`:id`updateUser | GET->`:id`getUser | DELETE->`:id` deleteUser

const path = "/api/user";

//ruta para pedir todos los user
router.get(`${path}`, async (req, res) => {
  const user = await usersApi.getAll();
  console.log(user);
  res.json(user);
});

//ruta para pedir un user(name)
router.get(`${path}/one`, async (req, res) => {
  const { username } = req.body;
  const response = usersApi.findOneByName(username);
  res.json(response);
});

//ruta para pedir un user(id)
router.get(`${path}/:id`, async (req, res) => {
  const { id } = req.params;
  const response = await usersApi.findOneById(id);
  res.json(response);
});

//ruta para postear un user
router.post(`${path}/register`, async (req, res) => {
  const {
    username,
    fullname,
    email,
    password,
    birthday,
    avatar,
    rol,
    isActive,
    isPublic,
  } = req.body;
  const newUser = {
    username,
    fullname,
    email,
    password: hashPassword(password),
    birthday,
    avatar,
    rol,
    isActive,
    isPublic,
  };
  console.log(newUser);
  usersApi.save(newUser);
  res.send("User created!");
});

//ruta para borrar un user
router.put(`${path}`, async (req, res) => {
  const { name } = req.body;
  habitsApi.deleteOne(name);
  res.json("se modifico el archivo");
});

router.post(`${path}/login`, async(req, res) => {
  const { email, password} = req.body;
  if(!email || !password){
    return res.status(400).json({message: 'Missing data'})
  }
  usersApi.login(email, password)
    .then( response => {
      if(response){
        const token = jwt.sign(
          {
            id: response.id,
            email: response.email,
            rol: response.rol
          },
          'No_Country-C8_44'
        );
        return res.status(200).json({message: 'User autenticated', token: token})
      } else {
        return res.status(401).json({message: 'Invalid Credentials'})
      }
    })
    .catch( err => {
      return res.status(401).json({message: 'Invalid Credentials'})
    })
});
module.exports = router;
