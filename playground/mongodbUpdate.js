const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
  if(err){
    console.log("Unable to connect Mongodb Server");
  }else {
    console.log("mongodb server connected");
    const db = client.db('Todo').collection('Todo')
          .findOneAndUpdate({
            _id: new ObjectID('5b8fe31d1b4e2d145f3b7006')
          },
          {
            $set:{
              completed:true
            }
          },
          {
            returnOriginal:false
          }
        ).then((result)=>{
            console.log(JSON.stringify(result,undefined,2));
          },(err)=>{
            console.log("Unable to fetch List");
          });
  }
});
