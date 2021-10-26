const express = require('express');
const http = require('http');
const cors = require('cors');
//const Sequelize = require("sequelize");
const { Sequelize, DataTypes } = require('sequelize');
const { readdirSync } = require('fs');


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const sequelize = new Sequelize('todo-list', 'postgres', '21082001', {
  host: 'localhost',
  dialect: 'postgres'
});

//const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname')

const func = async() => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully!');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}
func();

const ToDo = sequelize.define('ToDo', {
  // Model attributes are defined here
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
});
sequelize.sync().then(result=>{
    console.log(result);
  })
  .catch(err=> console.log(err));

// `sequelize.define` also returns the model
console.log(ToDo === sequelize.models.ToDo); // true



app.use((req, res, next) => {
    console.log('URL = ', req.url);
    console.log('Original_URL = ', req.origialUrl);
    console.log('METHOD = ', req.method);
    console.log('HOST = ', req.headers.host);
    console.log('InSecure = ', req.secure);
    console.log('BODY', req.body);
    console.log('QUERY', req.query);

    next();
});




app.post('/string', (req, res) => {
    ToDo.create({
        title: req.body.title,
        description: req.body.description
        
    }).then(ToDo => {
        res.status(200).json(ToDo);
    }).catch(function (err) {
        res.status(200).json('О НЕТ');
        console.log("create failed with error: " + err);
        return 0;
    });
  })

app.delete('/string/:index', (req, res) => { 

    const id = req.params.index;
    ToDo.destroy({
       where: { id: id }
   }).then(() => {
    res.status(200).json({msg:'строка ' + id+ ' удалена'});
   }).catch(function (err) {
       console.log("delete failed with error: " + err);
       return 0;
       // handle error;
   });

})

app.get('/string', (req, res) => { 
    ToDo.findAll().then(ToDos => {
        res.status(200).json({ToDos});
    }).catch(function (err) {
        console.log("findAll failed with error: " + err);
        return null;
  
    });

})

app.get('/string/:index', (req, res) => { 
    const id = req.params.index;
    ToDo.findByPk(id).then(ToDos => {
        res.status(200).json({ToDos});
   }).catch(function (err) {
       console.log("findByPk failed with error: " + err);
       return null;});
})

app.patch('/string/:index', (req, res) => { 
    const id = req.params.index;
    ToDo.update({ title: req.body.title, description: req.body.description },
       { where: { id: id } }
    ).then(() => {
        res.status(200).json({});
    }).catch(function (err) {
       console.log("update failed with error: " + err);
       return 0;})

    res.status(200).json({message:'Ok update'});

})





http.createServer(app).listen(80, () => {
     console.log('Server is working on port 80');})


