const express = require('express');

const config = require('../config/config');
const post = require('./components/post/network');
const errors = require('../network/errors');

const app = express();

// body parser
app.use(express.json())

/**Router*/
app.use('/api/post', post)


app.use(errors);

app.listen(config.post.port, () => {
  console.log('Api listen in port', config.post.port);
})