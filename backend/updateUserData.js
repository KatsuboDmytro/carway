const express = require('express');
const { Client } = require('pg');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

const port = 3003;

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
  const { email, password, name, phone, license, id, isfree } = req.body;
  const client = new Client(dbConfig);

  try {
    await client.connect();
    const result = await client.query(
      `UPDATE driver 
        SET name = $3, 
            license = $4, 
            phone = $5,
            driver_id = $6, 
            isfree = $7 
        WHERE email = $1 
            AND password = $2;
      `,
      [email, password, name, license, phone, id, isfree]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await client.end();
  }
})
// .put('/api/routes', async (req, res) => {
//   const { route_number } = req.body;
//   const client = new Client(dbConfig);

//   try {
//     await client.connect();
//     const result = await client.query(
//       `UPDATE routes SET successful = true WHERE route_number = $1;`,
//       [route_number]
//     );
//     res.json(result.rows);
//   } catch (error) {
//     console.error('Error executing query:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   } finally {
//     await client.end();
//   }
// });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});