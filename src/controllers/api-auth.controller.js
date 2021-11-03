const { Router } = require("express");
const { nanoid } = require("nanoid");
const ErrorResponse = require("../classes/error-response");
const Token = require("../dataBase/models/Token.model");
const User = require("../dataBase/models/User.model");
const { asyncHandler } = require("../middlewares/middlewares");
const { Op } = require("sequelize");

const router = Router();

function initRoutes() {
  router.post("/registration", asyncHandler(registration));
  router.post("/login", asyncHandler(login));
}

async function registration(req, res, next) {
  const userInDB = await User.findOne({
    where: {
      [Op.or]: [
        { login: req.body.login, },
        { email: req.body.email, }
      ]
    },
  });

  if (userInDB) {
    throw new ErrorResponse("User with this login or email already exists!", 400);
  }

  const newUser = await User.create(req.body);

  res.status(200).json(newUser);
}

async function login(req, res, next) {
  const existingUser = await User.findOne({
    where: req.body,
  });

  if (!existingUser) {
    throw new ErrorResponse("Incorrect login or password!", 404);
  }

  const newToken = await Token.create({
    userId: existingUser.id,
    value: nanoid(128),
  });

  res.status(200).json({
    accessToken: newToken.value,
    // userId: existingUser.userId,
    // login: existingUser.login,
    // password: existingUser.password,
    // email: existingUser.email
    existingUser,
  });
}

initRoutes();

module.exports = router;
