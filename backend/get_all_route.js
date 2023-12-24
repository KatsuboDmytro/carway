const express = require('express');
const nano = require('nano')('http://couchdb:couchdb@6.tcp.eu.ngrok.io:10249');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

const port = 3007;
const couchdbDatabase = nano.use('auto');
const corsOptions = {
  origin: 'http://localhost:3000',
};

const handleCouchDBError = (res, error, message) => {
  console.error(message, error);
  res.status(500).json({ error: 'Internal Server Error' });
};

app.get('/api/routes', cors(corsOptions), async (req, res) => {
  try {
    const result = await couchdbDatabase.list({ include_docs: true });
    const routes = result.rows.map(row => row.doc);
    res.json(routes);
  } catch (error) {
    handleCouchDBError(res, error, 'Error fetching data from CouchDB:');
  }
});

app.put('/api/routes/:route_number', async (req, res) => {
  const { route_number } = req.params;
  const data = req.body;

  try {
    const existingDoc = await couchdbDatabase.get(route_number);
    existingDoc.successful = true;

    const updatedData = {
      ...existingDoc,
      ...data,
    };

    const { id, rev } = existingDoc;
    await couchdbDatabase.insert(updatedData, id, rev);

    console.log('Updated route:', updatedData);
    res.status(200).json({ message: 'Route updated successfully' });
  } catch (error) {
    handleCouchDBError(res, error, 'Error updating route:');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
