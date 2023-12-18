// pgConnection.js
const { Client } = require('pg');

export const connectAndGetData = async () => {
  const client = new Client({
    user: 'postgres',
    host: '7.tcp.eu.ngrok.io',
    database: 'auto',
    password: 'postgres',
    port: 15882,
  });

  try {
    await client.connect();
    const result = await client.query('SELECT * FROM your_table'); // Replace 'your_table' with your actual table name
    return result.rows;
  } finally {
    await client.end();
  }
};
