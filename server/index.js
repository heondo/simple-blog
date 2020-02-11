const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config({ path: path.resolve(__dirname, '..', '.env') })

const blogRoute = require('./routes/blog');

app.use('/api/blog/', blogRoute);

// Error middleware for next()
app.use((err, req, res) => {
    console.log(err);
    res.send({
      error: err.error,
      message: err.message
    });
  }
);

const port = process.env.PORT || 4201;
const server = http.createServer(app);

server.listen(port, () => {
    console.log('listening on port ' + port);
});