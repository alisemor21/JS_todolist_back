const { Router } = require("express");
const Token = require("../dataBase/models/Token.model");
const ErrorResponse = require("../classes/error-response");
const User = require("../dataBase/models/User.model");
const { asyncHandler, requireToken } = require("../middlewares/middlewares");

const router = Router();

function initRoutes() {
  router.get("/me", asyncHandler(requireToken), asyncHandler(getUserInfo));
  router.patch("/me", asyncHandler(requireToken), asyncHandler(updateUser));
  router.post("/logout", asyncHandler(requireToken), asyncHandler(logoutUser));
}

async function getUserInfo(req, res, next) {
  const userInfo = await User.findByPk(req.userId);
  if (!userInfo) {
    throw new ErrorResponse("No such user", 404);
  }
  res.status(200).json(userInfo);
}

async function updateUser(req, res, next) {
  const user = await User.findByPk(req.userId);
  if (!user) {
    throw new ErrorResponse("No such user", 404);
  }
  await user.update(req.body);

  const updUser = await User.findByPk(req.userId);

  res.status(200).json(updUser);
}

async function logoutUser(req, res, next) {
  await Token.destroy({
    where: {
      value: req.header("x-access-token"),
    },
  });
  const allUsersTokens = await Token.findAll();
  res.status(200).json(allUsersTokens);
}

initRoutes();

module.exports = router;
