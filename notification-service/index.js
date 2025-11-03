// notification-service/index.js
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Simple in-memory "sent" log (for dev)
let sent = [];

app.post('/notify', (req, res) => {
  const { to, message } = req.body || {};
  if (!message) return res.status(400).json({ error: 'message required' });

  const record = { id: Date.now().toString(), to: to || 'unknown', message, sentAt: new Date().toISOString() };
  sent.push(record);

  // simulate sending (just log)
  console.log('Notification sent:', record);

  res.json({ status: 'ok', record });
});

app.get('/sent', (req, res) => {
  res.json(sent);
});

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(`Notification service listening on http://localhost:${PORT}`));
