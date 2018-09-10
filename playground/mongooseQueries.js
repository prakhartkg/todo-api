const {mongoose} =require('./../server/db/mongoose');
const {ObjectID} =require('mongodb');

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const id = '5b90dfdf2542771d9e57c5ff';

if(!ObjectID.isValid(id)){
  console.log("Invalid Id");
}

User.findById('4b90dfdf2542771d9e57c5ff').then((user)=>{
  if(!user){
    return console.log("Unable to find User");
  }
  console.log(JSON.stringify(user,undefined,2));
},(err)=>{
  console.log(err);
})

// Todo.find({
//   _id:id,
// }).then((todos)=>{
//   console.log(todos);
// });
//
//
// Todo.findOne({
//   _id:id
// }).then((todo)=>{
//   console.log(todo);
// });
//
// Todo.findById({
//   _id:id
// }).then((todo)=>{
//   if(!todo){
//     return console.log("ID not found");
//   }
//   console.log(todo);
// }).catch((e)=> console.log("Invalid Id"));
