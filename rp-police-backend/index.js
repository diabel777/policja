const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

let reports = [];
let nextId = 1;

// Pobierz wszystkie zgłoszenia
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

// Dodaj nowe zgłoszenie
app.post('/api/reports', (req, res) => {
  const report = {
    id: nextId++,
    description: req.body.description || '',
    assignedTo: null,
    status: 'open',
  };
  reports.push(report);
  res.json(report);
});

// Przypisz patrol do zgłoszenia
app.put('/api/reports/:id/assign', (req, res) => {
  const id = parseInt(req.params.id);
  const assignedTo = req.body.assignedTo;
  const report = reports.find(r => r.id === id);
  if (!report) return res.status(404).json({ error: 'Report not found' });
  report.assignedTo = assignedTo;
  res.json(report);
});

// Zamknij zgłoszenie
app.put('/api/reports/:id/close', (req, res) => {
  const id = parseInt(req.params.id);
  const report = reports.find(r => r.id === id);
  if (!report) return res.status(404).json({ error: 'Report not found' });
  report.status = 'closed';
  res.json(report);
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend działa na http://localhost:${port}`);
});