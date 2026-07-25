require('dotenv').config();
const app = require('./src/app');


const dns = require("dns");

console.log("Before:", dns.getServers());

dns.setServers(["8.8.8.8", "1.1.1.1"]);

console.log("After:", dns.getServers());

dns.resolve4("google.com", (err, addresses) => {
  console.log(err, addresses);
});

const connectDB = require('./src/config/database');
connectDB();

const PORT = process.env.PORT || 3200;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
});
