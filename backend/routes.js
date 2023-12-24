const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3005;

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

app.delete('/api/suggested_routes', async (req, res) => {
  const { suggest_id } = req.body;
  const query = 'DELETE FROM suggested_routes WHERE suggest_id = $1 RETURNING *';
  const values = [suggest_id];

  const result = await queryDatabase(query, values, res);
  res.json(result[0]);
});

app.post('/api/suggested_routes', async (req, res) => {
  const { route_number, end_location, start_location, distance_km, cost_per_km, driver_id, car_number } = req.body;
  const query = `
    INSERT INTO suggested_routes (route_number, end_location, start_location, distance_km, cost_per_km, driver_id, car_number)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [route_number, end_location, start_location, distance_km, cost_per_km, driver_id, car_number];

  const result = await queryDatabase(query, values, res);
  res.json(result[0]);
});

app.put('/api/driver', async (req, res) => {
  const { driver_id } = req.body;
  const query = 'UPDATE driver SET isfree = $1 WHERE driver_id = $2 RETURNING *';
  const values = [false, driver_id];

  const result = await queryDatabase(query, values, res);
  res.json(result[0]);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
