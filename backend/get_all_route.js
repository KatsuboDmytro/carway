const express = require('express');
const nano = require('nano')('http://couchdb:couchdb@6.tcp.eu.ngrok.io:10249');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());

const port = 3007;
const couchdbDatabase = nano.use('auto');
const corsOptions = {
  origin: 'http://localhost:3000',
};

app.get('/api/routes', cors(corsOptions), async (req, res) => {
  try {
    const result = await couchdbDatabase.list({ include_docs: true });
    const routes = result.rows.map(row => row.doc);
    res.json(routes);
  } catch (error) {
    console.error('Error fetching data from CouchDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}).put('/api/routes/:route_number', async (req, res) => {
  const { route_number } = req.params;
  const data = req.body;

  // Retrieve the existing document from CouchDB
  couchdbDatabase.get(route_number, async (err, existingDoc) => {
    if (err) {
      console.error('Error retrieving existing route:', err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }

    // Update the 'successful' field to true in the existing document
    existingDoc.successful = true;

    // Merge the existing document with the new data
    const updatedData = {
      ...existingDoc,
      ...data,
    };

    // Update the document in CouchcouchdbDatabase
    couchdbDatabase.insert(updatedData, (err, body) => {
      if (err) {
        console.error('Error updating route:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      console.log('Updated route:', body);
      res.status(200).json({ message: 'Route updated successfully' });
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
