const app = require('express')();
const server = require('http').Server(app);

server.listen(3000, () => {
  console.log('Server running on port 3000');
});