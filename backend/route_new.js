const express = require('express');
const nano = require('nano')('http://couchdb:couchdb@6.tcp.eu.ngrok.io:10249');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

const port = 3008;
const couchdbDatabase = nano.use('auto');
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors());
app.use(bodyParser.json());

const handleCouchDBError = (res, error, message, notFoundMessage) => {
  console.error(message, error);
  if (error.statusCode === 404) {
    res.status(404).json({ error: notFoundMessage });
  } else {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

app.get('/api/routes/:route_number', async (req, res) => {
  const { route_number } = req.params;

  try {
    const body = await couchdbDatabase.get(route_number);
    res.status(200).json(body);
  } catch (error) {
    handleCouchDBError(res, error, 'Error retrieving route:', 'Route not found');
  }
});

app.put('/api/routes/:route_number', cors(corsOptions), async (req, res) => {
  const { route_number } = req.params;
  const data = req.body;

  data._id = route_number;

  try {
    const result = await couchdbDatabase.insert(data);
    result.status(200).json({ message: 'Route updated successfully' });
  } catch (error) {
    handleCouchDBError(res, error, 'Error updating route:', 'Cannot update route');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
