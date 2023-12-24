const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const app = express();

const port = 3001;
const dbConfig = {
  user: 'postgres',
  host: '2.tcp.eu.ngrok.io',
  database: 'auto',
  password: 'postgres',
  port: 17018,
};
const corsOptions = {
  origin: 'http://localhost:3000',
};

const queryDatabase = async (tableName, res) => {
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query(`SELECT * FROM ${tableName}`);
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
};

app.use('/api/admin', cors(corsOptions), async (req, res) => {
  await queryDatabase('admin', res);
});

app.use('/api/driver', cors(corsOptions), async (req, res) => {
  await queryDatabase('driver', res);
});

app.use('/api/vehicles', cors(corsOptions), async (req, res) => {
  await queryDatabase('vehicles', res);
});

app.use('/api/suggested_routes', cors(corsOptions), async (req, res) => {
  await queryDatabase('suggested_routes', res);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
