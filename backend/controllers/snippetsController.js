const db = require('../db');

exports.getAllSnippets = async (req, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM snippets ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching snippets:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.createSnippet = async (req, res) => {
  const { title, language, code } = req.body;
  if (!title || !language || !code) {
    return res.status(400).json({ error: 'Title, language, and code are required' });
  }
  try {
    const query = 'INSERT INTO snippets(title, language, code) VALUES($1, $2, $3) RETURNING *';
    const values = [title, language, code];
    const { rows } = await db.query(query, values);
    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating snippet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getSnippetById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('SELECT * FROM snippets WHERE id = $1', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching snippet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.updateSnippet = async (req, res) => {
  const { id } = req.params;
  const { title, language, code } = req.body;
  if (!title || !language || !code) {
    return res.status(400).json({ error: 'Title, language, and code are required' });
  }
  try {
    const query = 'UPDATE snippets SET title = $1, language = $2, code = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *';
    const values = [title, language, code, id];
    const { rows } = await db.query(query, values);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating snippet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.deleteSnippet = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query('DELETE FROM snippets WHERE id = $1 RETURNING *', [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Snippet not found' });
    }
    res.json({ message: 'Snippet deleted successfully' });
  } catch (error) {
    console.error('Error deleting snippet:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
