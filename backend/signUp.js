const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3004;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const dbConfig = {
  user: 'postgres',
  host: '2.tcp.eu.ngrok.io',
  database: 'auto',
  password: 'postgres',
  port: 17018,
};

const queryDatabase = async (query, values, res) => {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query(query, values);
    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
};

app.put('/api/driver', async (req, res) => {
  const { email, password } = req.body;

  try {
    const query = 'INSERT INTO driver (email, password) VALUES ($1, $2) RETURNING *';
    const values = [email, password];
    const result = await queryDatabase(query, values, res);

    res.json(result);
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
