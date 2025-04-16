const express = require('express');
const cors = require('cors');
const fs = require('fs');
const morgan = require('morgan');
const { calculateStats } = require('./util');

const app = express();
//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/data', (req, res) => {
    fs.readFile('./data.json', 'utf-8', (err, rawData) => { // reading the data from the data.json file
      if (err) {
        console.error('Error reading data.json:', err);
        return res.status(500).json({ error: 'Failed to load data' });
      }
      try {
        const parsedData = JSON.parse(rawData);
        const stats = calculateStats(parsedData);
        if (!stats) {
          return res.status(500).json({ error: 'Failed to calculate stats' });
        }
        res.json(stats);
      } catch (error) {
        console.error('Error parsing data.json:', error);
        res.status(500).json({ error: 'Failed to parse data' });
      }
    });
  });

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));