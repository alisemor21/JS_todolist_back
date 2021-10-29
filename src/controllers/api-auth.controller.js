const { Router } = require("express");
const { nanoid } = require("nanoid");
const ErrorResponse = require('../classes/error-response');
//const { where } = require("sequelize/types");
const ToDo = require("../dataBase/models/ToDo.model");
const { create } = require("../dataBase/models/ToDo.model");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
//const ErrorResponse = require('../classes/error-response');
//const ToDo = require('../dataBase/models/ToDo.model.');
const { asyncHandler } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

async function registration(req, res, next) {
  const userByLogin = await User.findOne({
    where: {
      login: req.body.login,
    },
  });

  if (userByLogin) {
    throw new ErrorResponse("User with this login already exists", 400);
  }

  const newUser = await User.create(req.body);

  res.status(200).json(newUser);
}

async function login(req, res, next) {
  const existingUser = await User.findOne({
    where: req.body,
  });

  if (!existingUser) {
    throw new ErrorResponse("Incorrect login or password", 404);
  }

  const newToken = await Token.create({
    userId: existingUser.id,
    value: nanoid(128),
  });

  res.status(200).json({
    accessToken: newToken.value,
  });
}

initRoutes();

module.exports = router;
