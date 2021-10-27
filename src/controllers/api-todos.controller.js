const { Router } = require('express');
const ToDo = require('../dataBase/models/ToDo.model');
const User = require('../dataBase/models/User.model');
const { create } = require('../dataBase/models/ToDo.model');
//const ErrorResponse = require('../classes/error-response');
//const ToDo = require('../dataBase/models/ToDo.model.');
const { asyncHandler } = require('../middlewares/middlewares');

const router = Router();

function initRoutes() {
    router.get('/', asyncHandler(getToDos));
    router.get('/:id', asyncHandler(getToDoById));
    router.post('/',asyncHandler(createToDo));
    router.delete('/',asyncHandler(deleteToDos));
    router.delete('/:id',asyncHandler(deleteToDoById));
    router.patch('/:id',asyncHandler(patchToDo));
}

async function getToDos(req, res, next) {
    const todos = await ToDo.findAll();
    res.status(200).json({ todos });
}

async function getToDoById(req, res, next) {
    const todo = await ToDo.findByPk(req.params.id);
    if (!todo) {
        throw new ErrorResponse('No todo found', 404);
    }
    res.status(200).json(todo);
}

async function createToDo(req, res, next) {
    const user = await User.create();
    const todo = await ToDo.create({
        title: req.body.title,
        description: req.body.description,
      })
    res.status(200).json(todo);
}

async function deleteToDos(req, res, next) {
    await ToDo.destroy({truncate: true})
    res.status(200).json(ToDo);
}
async function deleteToDoById(req, res, next) {
    //const id = req.params.index;
    //await ToDo.destroy({where: { id: id }})

    const todo = await ToDo.findByPk(req.params.id);
    if (!todo){ throw new ErrorResponse('No ToDo found', 404)}

    await todo.destroy();

    res.status(200).json({message: "OK"});
}

async function patchToDo(req, res, next) {

    let todo = await ToDo.findByPk(req.params.id);

    if (!todo){ throw new ErrorResponse('No ToDo found', 404)}
    const id = req.params.id;
    await todo.update(req.body);
    res.status(200).json({message: "OK"});
}

initRoutes();

module.exports = router;



