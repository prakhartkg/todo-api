const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo')

const todoList =[{
  _id:new ObjectID(),
  text:"First test"
},{
  _id:new ObjectID(),
  text:"second todo"
}];

beforeEach((done)=>{
  Todo.deleteMany({}).then(()=>{
    return Todo.insertMany(todoList);
  }).then(()=>done())
  .catch((e)=>done(e));
});

describe("POST /todos",()=>{
  it('Should create a new todo',(done)=>{
    var text = 'Test todo text';
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res)=>{
        expect(res.body.text).toBe(text);
      })
      .end((err,res)=>{
        if(err){
          return done(err)
        }
        Todo.find().then((todos)=>{
          expect(todos.length).toBe(3);
          expect(todos[todos.length-1].text).toBe(text);
          done();
        }).catch((e)=>done(e));
      })
  });


  it('should not create todo with invalid body data',(done)=>{
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,res)=>{
          if(err){
            return done(err);
          }
          Todo.find().then((todos)=>{
            expect(todos.length).toBe(2)
            done();
          }).catch((e)=>done(e))
      });
  });
});

describe('GET /todos',()=>{
  it('should return all todos',(done)=>{
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res)=>{
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe('GET /todos/:id',()=>{
  it('should return todo',(done)=>{
    request(app)
      .get(`/todos/${todoList[0]._id.toHexString()}`)
      .expect(200)
      .expect((res)=>{
        expect(res.body.todo.text).toBe(todoList[0].text);
      })
      .end(done);
  });

  it('should return 404',(done)=>{
    const id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done);
  });

  it('should return 400 as not a valid id',(done)=>{
    request(app)
      .get(`/todos/121`)
      .expect(400)
      .end(done);
  });
});
