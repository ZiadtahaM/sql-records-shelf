import React, { useState, useEffect } from 'react';

function App() {
  const [snippets, setSnippets] = useState([]);
  const [formData, setFormData] = useState({ title: '', language: '', code: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchSnippets();
  }, []);

  const fetchSnippets = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/snippets');
      if (res.ok) {
        const data = await res.json();
        setSnippets(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await fetch(`http://localhost:5000/api/snippets/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        setEditingId(null);
      } else {
        await fetch('http://localhost:5000/api/snippets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
      }
      setFormData({ title: '', language: '', code: '' });
      fetchSnippets();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (snippet) => {
    setFormData({ title: snippet.title, language: snippet.language, code: snippet.code });
    setEditingId(snippet.id);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/snippets/${id}`, { method: 'DELETE' });
      fetchSnippets();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Code Shelf</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleInputChange} required style={{ marginRight: '10px' }} />
        <input type="text" name="language" placeholder="Language" value={formData.language} onChange={handleInputChange} required style={{ marginRight: '10px' }} />
        <textarea name="code" placeholder="Code snippet..." value={formData.code} onChange={handleInputChange} required style={{ marginRight: '10px', verticalAlign: 'top' }} />
        <button type="submit">{editingId ? 'Update' : 'Add'}</button>
        {editingId && <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', language: '', code: '' }); }} style={{ marginLeft: '10px' }}>Cancel</button>}
      </form>

      <div>
        {snippets.map(s => (
          <div key={s.id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '10px' }}>
            <h2>{s.title} ({s.language})</h2>
            <pre style={{ background: '#eee', padding: '10px' }}>{s.code}</pre>
            <button onClick={() => handleEdit(s)} style={{ marginRight: '10px' }}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
