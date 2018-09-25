require('./config/config');
const express = require('express');
const bodyParser=require('body-parser');
const {ObjectID} = require('mongodb');

const _ = require('lodash');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.listen(process.env.PORT,()=>{
  console.log(`Started on ${process.env.PORT}`);
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
    res.send({todo});
  });

});

app.patch('/todos/:id',(req,res)=>{
  const id = req.params.id;
  if(!ObjectID.isValid(id)){
    res.send(400).send({
      message:"Invalid Id"
    });
  }
  let body = _.pick(req.body,['text','completed']);

  if(_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else{
    body.completed=false;
    body.completedAt=null;
  }
  Todo.findOneAndUpdate({_id:id},
    {$set: body}
    ,{new:true}).then((todo)=>{
      if(!todo){
        res.status(404).send({message:"Id not found"});
      }
      res.send({todo});
    }).catch((e)=>{
      res.status(500).send({
        message:"Server Error"
      });
    });

});

app.post('/users',async (req,res)=>{
  let body = _.pick(req.body,['email','password']);
  let user = new User(body);
  try{
    user = await user.save();
  }catch(e){
    res.status(500).send(e);
  }
  if(!user){
    res.status(404).send({message:"User not found"})
  }
  res.send(user);
});

module.exports ={app}
