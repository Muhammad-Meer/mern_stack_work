const app = require('./src/app');



const PORT = process.env.PORT || 3200;





app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
})