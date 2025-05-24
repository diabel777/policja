import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:5000/api/reports';

function App() {
  const [reports, setReports] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setReports(data));
  }, []);

  const addReport = () => {
    fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    })
      .then(res => res.json())
      .then(newReport => setReports([...reports, newReport]));
    setText('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>RP Police Reports</h1>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="New report"
      />
      <button onClick={addReport}>Add Report</button>
      <ul>
        {reports.map(r => (
          <li key={r.id}>{r.text}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;