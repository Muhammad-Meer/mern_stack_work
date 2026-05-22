const app = require('./src/app');
const connectDB = require('./src/config/database');




connectDB();

const PORT = process.env.PORT || 3200;





app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})