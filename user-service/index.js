// index.js
const express = require('express');
const serverless = require('serverless-http');

const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
  res.json([{ id: 1, name: "Archita" }, { id: 2, name: "Aditi" }]);
});

app.post('/users', (req, res) => {
  const user = req.body;
  res.status(201).json({ message: "User created", user });
});

// -------------- local runner --------------
// If file is run directly (node index.js), start Express server.
// When loaded by Lambda (module imported), this block is skipped.
if (require.main === module) {
  const PORT = process.env.PORT || 4001;
  app.listen(PORT, () => {
    console.log(`User service listening on http://localhost:${PORT}`);
  });
}

// export handler for AWS Lambda via serverless-http
module.exports.handler = serverless(app);
