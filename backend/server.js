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

app.use('/api/admin', cors(corsOptions), async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM admin');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
}).use('/api/driver', cors(corsOptions), async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM driver');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
})
// .use('/api/routes', cors(corsOptions), async (req, res) => {
//   const client = new Client(dbConfig);
//   try {
//     await client.connect();
//     const result = await client.query('SELECT * FROM routes');
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     await client.end();
//   }
// })
.use('/api/vehicles', cors(corsOptions), async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM vehicles');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
}).use('/api/suggested_routes', cors(corsOptions), async (req, res) => {
  const client = new Client(dbConfig);
  try {
    await client.connect();
    const result = await client.query('SELECT * FROM suggested_routes;');
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
