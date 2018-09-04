const {MongoClient,ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017',(err,client)=>{
  if(err){
    console.log("Unable to connect Mongodb Server");
  }else {
    console.log("mongodb server connected");
    const db = client.db('Todo').collection('Todo')
          .find({
            _id: new ObjectID('5b8e7ced46db0913d9707524')
          }).toArray().then((data)=>{
            console.log(JSON.stringify(data,undefined,2));
          },(err)=>{
            console.log("Unable to fetch List");
          })
  }
});
