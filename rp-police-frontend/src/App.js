import React, { useEffect, useState } from 'react';

const API_URL = 'https://rp-police-backend.onrender.com/api'; // Po deployu zmień na swój URL backendu

function App() {
  const [reports, setReports] = useState([]);
  const [description, setDescription] = useState('');
  const [assigned, setAssigned] = useState('');

  const fetchReports = async () => {
    const res = await fetch(`${API_URL}/reports`);
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const addReport = async () => {
    if (!description.trim()) return;
    await fetch(`${API_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ description }),
    });
    setDescription('');
    fetchReports();
  };

  const assignReport = async (id) => {
    if (!assigned.trim()) return;
    await fetch(`${API_URL}/reports/${id}/assign`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ assignedTo: assigned }),
    });
    setAssigned('');
    fetchReports();
  };

  const closeReport = async (id) => {
    await fetch(`${API_URL}/reports/${id}/close`, {
      method: 'PUT',
    });
    fetchReports();
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h1>RP Policja - Zgłoszenia</h1>
      <div>
        <input
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Opis zgłoszenia"
          style={{ width: '60%', padding: 8 }}
        />
        <button onClick={addReport} style={{ padding: 8, marginLeft: 8 }}>Dodaj</button>
      </div>
      <ul style={{ marginTop: 20 }}>
        {reports.map(r => (
          <li key={r.id} style={{ marginBottom: 12, borderBottom: '1px solid #ccc', paddingBottom: 8 }}>
            <b>ID #{r.id}</b> - {r.description} <br />
            Status: <i>{r.status}</i> <br />
            Przypisany do: <b>{r.assignedTo || 'BRAK'}</b> <br />
            <input
              placeholder="Przypisz patrol"
              value={assigned}
              onChange={e => setAssigned(e.target.value)}
              style={{ padding: 6, marginTop: 4 }}
            />
            <button onClick={() => assignReport(r.id)} style={{ marginLeft: 6, padding: 6 }}>Przypisz</button>
            {r.status === 'open' && (
              <button onClick={() => closeReport(r.id)} style={{ marginLeft: 10, padding: 6 }}>Zamknij</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;