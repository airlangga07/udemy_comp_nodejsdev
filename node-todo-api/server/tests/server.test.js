const expect = require("expect");
const request = require("supertest");
const { ObjectID } = require("mongodb");
const { app } = require("./../server");
const { Todo } = require("./../models/todo");
const { User } = require("./../models/user"); 
const { todos, populateTodos, users, populateUsers } = require("./seed/seed");

beforeEach(populateUsers);
beforeEach(populateTodos);

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

describe("PATCH /todos/:id", () => {
  it("Should update the todo" , (done) => {
    var hexID = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        text: "Updated todo",
        completed: true
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe("Updated todo");
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID).then((todo) => {
          expect(todo.text).toBe("Updated todo");
          expect(todo.completed).toBe(true);
          expect(todo.completedAt).toBeA('number');
          done();
        }).catch((e) => done(e));
      });

  })

  it("Should clear completedAt when todo is not completed", (done) => {
    var hexID = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${hexID}`)
      .send({
        text: "CompletedAt to false",
        completed: false
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe("CompletedAt to false")
        expect(res.body.todo.completed).toBe(false)
        expect(res.body.todo.completedAt).toNotExist()
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.findById(hexID).then((todo) => {
          expect(todo.text).toBe("CompletedAt to false");
          expect(todo.completed).toBe(false);
          expect(todo.completedAt).toNotExist();
          done();
        }).catch((e) => done(e));
      });
  })
});

describe("GET /users/me", () => {
  it("Should return user if authenticated", (done) => {
    request(app)
      .get("/users/me")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toHexString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  })

  it("Should return 401 if not authenticated", (done) => {
    request(app)
      .get("/users/me")
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  })
})

describe("POST /users", () => {
  it("Should create a user", (done) => {
    var email = "example@example.com";
    var password = "1234abc";

    request(app)
      .post("/users")
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers["x-auth"]).toExist();
        expect(res.body.email).toBe(email);
        expect(res.body._id).toExist();
      })
      .end((err) => {
        if (err) {
          return done(err);
        }

        User.findOne({email}).then((user) => {
          expect(user).toExist();
          expect(user.password).toNotBe(password);
          done();
        }).catch((e) => done(e));
      });
  })

  it("Should return validation error if request invalid", (done) => {
    var email = "example"
    var password = "abc"

    request(app)
      .post("/users")
      .send({email, password})
      .expect(400)
      .end(done);
  })

  it("Should not create user if email is in user", (done) => {
    var email = users[0].email
    var password = "1234abc"

    request(app)
      .post("/users")
      .send({email, password})
      .expect(400)
      .end(done);
  })
})

describe("POST /users/login", () => {
  it("Should login user and return auth token", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: users[1].email,
        password: users[1].password
      })
      .expect(200)
      .expect((res) => {
        expect(res.headers["x-auth"]).toExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens[0]).toInclude({
            access: 'auth',
            token: res.headers['x-auth']
          })
          done();
        }).catch((e) => done(e));
      })
  })

  it("Should reject invalid login", (done) => {
    request(app)
      .post("/users/login")
      .send({
        email: users[1].email,
        password: "test1234"
      })
      .expect(400)
      .expect((res) => {
        expect(res.headers['x-auth']).toNotExist();
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[1]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      })
  })
})

describe("DELETE /users/me/token", () => {
  it("Should remove auth token on logout", (done) => {
    request(app)
      .delete("/users/me/token")
      .set("x-auth", users[0].tokens[0].token)
      .expect(200)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      })
  })
})