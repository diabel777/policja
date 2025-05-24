const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let reports = [];

app.get('/api/reports', (req, res) => {
  res.json(reports);
});

app.post('/api/reports', (req, res) => {
  const report = req.body;
  report.id = reports.length + 1;
  reports.push(report);
  res.status(201).json(report);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});