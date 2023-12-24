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

app.get('/api/routes/:route_number', async (req, res) => {
  const { route_number } = req.params;

  // Retrieve the document from CouchDB based on route_number
  couchdbDatabase.get(route_number, (err, body) => {
    if (err) {
      console.error('Error retrieving route:', err);
      // If the document is not found, return a 404 status
      if (err.statusCode === 404) {
        res.status(404).json({ error: 'Route not found' });
      } else {
        res.status(500).json({ error: 'Internal Server Error' });
      }
      return;
    }

    console.log('Retrieved route:', body);
    res.status(200).json(body);
  });
}).put('/api/routes/:route_number', cors(corsOptions), async (req, res) => {
  const { route_number } = req.params;
  const data = req.body;

  data._id = route_number;

  couchdbDatabase.insert(data, (err, body) => {
    if (err) {
      console.error('Error updating route:', err);
      res.status(500).json({ error: 'Can not make put' });
      return;
    }

    console.log('Updated route:', body);
    res.status(200).json({ message: 'Route updated successfully' });
  });
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
