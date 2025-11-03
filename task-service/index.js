const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let tasks = [];

app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const { id, title } = req.body;
  const newTask = { id, title, completed: false };
  tasks.push(newTask);
  res.json({ message: 'Task added', task: newTask });
});

app.put('/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id == req.params.id);
  if (task) {
    task.completed = req.body.completed;
    res.json({ message: 'Task updated', task });
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(t => t.id != req.params.id);
  res.json({ message: 'Task deleted' });
});

app.listen(4002, () => {
  console.log('Task service listening on http://localhost:4002');
});
