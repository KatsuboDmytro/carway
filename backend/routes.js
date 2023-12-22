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
  port: 14459,
};

app.delete('/api/suggested_routes', async (req, res) => {
  const { suggest_id } = req.body;
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query(
      `DELETE FROM suggested_routes WHERE suggest_id = $1`,
      [suggest_id]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
}).post('/api/suggested_routes', async (req, res) => {
  const { route_number, end_location, start_location, distance_km, cost_per_km, driver_id, car_number } = req.body;
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO suggested_routes (route_number, end_location, start_location, distance_km, cost_per_km, driver_id, car_number)                                                            
      VALUES ($1, $2, $3, $4, $5, $6, $7);`,
      [route_number, end_location, start_location, distance_km, cost_per_km, driver_id, car_number]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
}).put('/api/routes', async (req, res) => {
  const {
    route_number,
    car_number,
    end_location,
    start_location,
    driver_id,
    distance_km,
    fuel_consumption,
    cost_per_km
  } = req.body;

  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query(
      `INSERT INTO routes (route_number, car_number, end_location, start_location, driver_id, distance_km, fuel_consumption, cost_per_km) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
      [
        route_number,
        car_number,
        end_location,
        start_location,
        driver_id,
        distance_km,
        fuel_consumption,
        cost_per_km
      ]
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
}).put('/api/driver', async (req, res) => {
  const { driver_id, isfree } = req.body;
  const client = new Client(dbConfig);

  try {
    await client.connect();

    const result = await client.query(
      `UPDATE driver SET isfree = false WHERE driver_id = $1;`,
      [ driver_id ]
    );

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