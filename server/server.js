const express = require('express');
const bodyParser=require('body-parser');
const {ObjectID} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.listen(8080,()=>{
  console.log('Started on 8080');
});


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

app.get('/todos/:id',(req,res)=>{
  if(!ObjectID.isValid(req.params.id)){
    res.status(400).send({
      message:"Invalid Id"
    });
  }
  Todo.findById(req.params.id).then((todo)=>{
      if(!todo){
        res.status(404).send();
      }
      res.send({todo});
    }).catch((e)=>{
      res.status(500).send()
    });
});

app.delete('/todos/:id',(req,res)=>{
  if(!ObjectID.isValid(req.params.id)){
    res.send(400).send({
      message:"Invalid Id"
    });
  }
  Todo.findByIdAndDelete(req.params.id).then((todo)=>{
    if(!todo){
      res.status(404).send({
        message:"Id Not Found"
      })
    }
    res.send(todo);
  });

});

module.exports ={app}
