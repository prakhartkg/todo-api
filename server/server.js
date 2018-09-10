const express = require('express');
const bodyParser=require('body-parser');


const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos',(req,res)=>{
    var todo = new Todo({
      text : req.body.text,
      completed:req.body.completed,
      completedAt:req.body.completedAt
    });
    todo.save().then((data)=>{
      res.send(data);
    },(e)=>{
      res.status(400).send(e);
    });

});

app.get('/todos',(req,res)=>{
  Todo.find().then((todos)=>{
    res.send({todos});
  },(err)=>{
    res.status(500).send(err);
  });
});

app.listen(3000,()=>{
  console.log('Started on 3000');
});


module.exports ={app}
