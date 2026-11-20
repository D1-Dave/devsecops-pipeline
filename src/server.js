'use strict';

const app = require('./app');

// Configuration comes from the environment, never from source code.
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
