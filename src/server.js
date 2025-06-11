const app = require('./app');
const PORT = process.env.PORT || 3000;
const sequelize = require('./config/database');
const { initModels } = require('./models');

app.listen(PORT, async () => {
  await initModels(); 
  console.log(`Server running at http://localhost:${PORT}`);
});

sequelize.authenticate()
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB connection failed', err));
