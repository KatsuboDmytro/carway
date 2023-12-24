const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port = 3006;

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

app.put('/api/driver', async (req, res) => {
  const { driver_id } = req.body;
  const client = new Client(dbConfig);

  try {
    await client.connect();

    const result = await client.query(
      `UPDATE driver SET isfree = true WHERE driver_id = $1;`,
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