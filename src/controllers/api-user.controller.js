const { Router } = require('express');
const ToDo = require('../dataBase/models/ToDo.model');
const { create } = require('../dataBase/models/ToDo.model');
//const ErrorResponse = require('../classes/error-response');
//const ToDo = require('../dataBase/models/ToDo.model.');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() { 
    router.get('/:id', asyncHandler(getUserInfo));
    router.patch('/:id',asyncHandler(updateUser));
    router.post('/logout',asyncHandler(logoutUser));

}

async function getUserInfo(req, res, next) {
    const userInfo = await User.findByPk(req.params.id);
    if (!userInfo) {
        throw new ErrorResponse('No such user', 404);
    }
    res.status(200).json(userInfo);
}

async function updateUser(req, res, next) {
    const user = await User.findByPk(req.params.id);

    if (!user){ throw new ErrorResponse('No such user', 404)}
    await user.update(req.body);
    res.status(200).json({message: "OK"});
}
async function logoutUser(req, res, next) {
    await ToDo.destroy({truncate: true})
    res.status(200).json(ToDo);
}
// async function deleteToDoById(req, res, next) {
//     //const id = req.params.index;
//     //await ToDo.destroy({where: { id: id }})

//     const todo = await ToDo.findByPk(req.params.id);
//     if (!todo){ throw new ErrorResponse('No ToDo found', 404)}

//     await todo.destroy();

//     res.status(200).json({message: "OK"});
// }

// async function patchToDo(req, res, next) {
//     let todo = await ToDo.findByPk(req.params.id);

//     if (!todo){ throw new ErrorResponse('No ToDo found', 404)}
//     const id = req.params.id;
//     await todo.update(req.body);
//     res.status(200).json({message: "OK"});
// }

initRoutes();

module.exports = router
