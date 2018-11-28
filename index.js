const express = require('express');
const path = require('path');
const cors = require('cors')
const app = express();
const api = require('./api');
const port = process.env.PORT || 5000;

// to enable CORS
app.use(cors())

// API calls
app.use('/api', api())

app.listen(port, () => console.log(`Listening on port ${port}`));