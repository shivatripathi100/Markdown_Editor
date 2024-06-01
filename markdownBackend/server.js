const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { marked }= require('marked');
const DOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const window = new JSDOM('').window;
const purify = DOMPurify(window);

app.post('/convert', (req, res) => {
  const markdownText = req.body.markdown;
  if (markdownText === undefined) {
    return res.status(400).send({ error: 'Markdown content missing' });
  }
  try {
    let html = marked(markdownText);
    html = purify.sanitize(html); // Sanitize HTML
    res.send({ html });
  } catch (error) {
    console.error('Error converting markdown:', error);
    res.status(500).send({ error: 'Failed to convert markdown' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});