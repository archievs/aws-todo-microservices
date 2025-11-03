// analytics-service/index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

let events = [];

app.post('/events', (req, res) => {
  const ev = req.body || {};
  ev.receivedAt = new Date().toISOString();
  events.push(ev);
  console.log('Analytics event:', ev);
  res.json({ status: 'ok' });
});

app.get('/metrics', (req, res) => {
  // simple metrics: count of task_created and task_completed
  const created = events.filter(e => e.type === 'task_created').length;
  const completed = events.filter(e => e.type === 'task_completed').length;
  res.json({ totalEvents: events.length, created, completed });
});

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`Analytics service listening on http://localhost:${PORT}`));
