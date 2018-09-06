//const MongoClient = require('mongodb').MongoClient;
const {MongoClient} = require('mongodb');
MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
  if(err){
    console.log("Unable to connect Mongodb Server");
  }else {11
    console.log("mongodb server connected");
  }
  //const db=client.db('Todo').collection('Todo');
  // db.insertOne({
  //   title : 'Add my first todo',
  //   content : 'This is to add a todo',
  //   completed : false
  // },(err,result)=>{
  //   if(err){
  //     console.log("Unable to add Data");
  //   }
  //   console.log(JSON.stringify(result.ops,undefined,2));
  // });
  const db=client.db('Todo').collection('user');
  db.insertOne({
    name : 'Prakhar Jain',
    age : 25,
    location : 'Bangalore'
  },(err,result)=>{
    if(err){
      console.log("Unable to add user Data");
    }
    console.log(JSON.stringify(result.ops,undefined,2));
  });
  client.close();
});
