// code away!

const server = require('./server')

port = 5000
  
// watch for connections on port 5000
server.listen(port, () =>
console.log(`Server running on http://localhost:${port}`)
);