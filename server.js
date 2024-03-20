import http from 'http';
import app from './app/app.js';
let PORT = 5000;
const server = http.createServer(app);




server.listen(PORT, (err) => {
  if (err) console.log(err);
  console.log('server is running on port 5000');
});
