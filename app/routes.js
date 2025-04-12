var Todo = require('./models/todo');

function getTodos(res) {
    Todo.find(function (err, todos) {
        if (err) {
            return res.send(err); // ✅ Added return
        }
        res.json(todos);
    });
};

module.exports = function (app) {

    // get all todos
    app.get('/api/todos', function (req, res) {
        getTodos(res);
    });

    // create todo and send back all todos after creation
    app.post('/api/todos', function (req, res) {
        Todo.create({
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err) return res.send(err); // ✅ Added return

            getTodos(res);
        });
    });

    // delete a todo
    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.deleteOne({ // ✅ Optional: use `deleteOne` instead of `remove` (deprecated)
            _id: req.params.todo_id
        }, function (err) {
            if (err) return res.send(err); // ✅ Added return

            getTodos(res);
        });
    });

    // frontend routing (for Angular)
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html');
    });
};
