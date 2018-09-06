const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
  if(err){
    console.log("Unable to connect Mongodb Server");
  }else {
    console.log("mongodb server connected");
    const db = client.db('Todo').collection('Todo')
          .findOneAndDelete({
            _id: new ObjectID('5b8e7d17adb3fe13f26e8a47')
          }).then((result)=>{
            console.log(JSON.stringify(result,undefined,2));
          },(err)=>{
            console.log("Unable to fetch List");
          })
  }
});
