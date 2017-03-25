const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");
const { app } = require("./../server");
const { Todo } = require("./../models/todo");


const todos = [{
  _id: new ObjectID(),
  text: "First test todo"
}, {
  _id: new ObjectID(),
  text: "Second test todo"
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe("POST /todos", () => {
  it('Should create a new todo', (done) => {
    var text = "test todo text";

    request(app)
      .post("/todos")
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      })
  })

  it('Should not create to do with invalid body data', (done) => {
    request(app)
      .post("/todos")
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  })
});

describe("GET /todos", () => {
  it("Should get all todos", (done) => {
    request(app)
      .get("/todos")
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
});

describe("GET /todos/:id", () => {
  it("Should return todo doc", (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe("First test todo")
      })
      .end(done);
  });

  it("Should return a 404 if todo not found", (done) => {
    var invalid_id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${ invalid_id }`)
      .expect(404)
      .end(done);
  });

  it("Should return a 404 for non object ID", (done) => {
    var invalid_url = "/todos/123";
    request(app)
      .get(invalid_url)
      .expect(404)
      .end(done);
  });
})

describe("DELETE /todos/:id", () => {
  it("Should remove a todo", (done) => {
    var hexID = todos[1]._id.toHexString();
    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID)
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((e) => done(e));
      })
  });

  it("Should return a 404 if todo not found", (done) => {
    var invalid_id = new ObjectID().toHexString();
    request(app)
      .delete(`/todos/${ invalid_id }`)
      .expect(404)
      .end(done);
  });

  it("Should return a 404 for non object ID", (done) => {
    var invalid_url = "/todos/123";
    request(app)
      .delete(invalid_url)
      .expect(404)
      .end(done);
  });
})