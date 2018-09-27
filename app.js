const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
require('dotenv').config();

const app = express();
app.set('view engine', 'ejs');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
mongoose.connect(process.env.mongoURI);

// Validate Mongoose Database Connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('mongoose connected');
});

// Specify Todo Schema and Model
const todoSchema = new mongoose.Schema({
  id: String,
  todo: String
});

const Todo = mongoose.model('Todo', todoSchema);

// const newTodo = new Todo({ id: uuidv1(), todo: 'Sleep' });
// newTodo.save((err, newTodo) => {
//   if (err) return console.error(err);
//   console.log(newTodo);
// });

// Todo.deleteOne({ todo: 'Sleep' }, (err) => {
//   console.error(err);
// });

// Specify Paths
app.get('/', (req, res) => {
  Todo.find((err, todos) => {
    if (err) return console.error(err);
    console.log(todos);
    res.render('index', { todos });
  });
});

app.post('/addTodo.html', urlencodedParser, (req, res) => {
  const newTodo = new Todo({ id: uuidv1(), todo: req.body.text });
  newTodo.save((err, newTodo) => {
    if (err) return console.error(err);
    console.log(newTodo);
  });
  res.redirect('/');
});

app.delete('/deleteTodo/:id', (req, res) => {
  const { id } = req.params;
  console.log(id);
  // Todo.deleteOne({ id: })
})

app.listen(3000, () => {
  console.log('Express Server Running on Port 3000');
});
