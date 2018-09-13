const {mongoose} =require('./../server/db/mongoose');
const {ObjectID} =require('mongodb');

const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

const objectId = '5b9845840c41a7102f6aad0';

Todo.findByIdAndDelete(objectId).then((res)=>{
  console.log(res);
}).catch((e)=>{
  console.log("Error");
});

Todo.findOneAndRemove({_id:objectId}).then((res)=>{
  console.log(res);
}).catch((e)=>console.log(e));
