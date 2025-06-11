require('dotenv').config();
const bcrypt = require('bcrypt');
const { initModels, User } = require('./src/models');

(async () => {
  await initModels();
  const hash = await bcrypt.hash('admin123', 10);

  await User.create({ username: 'admin', password: hash, role: 'admin' });
  console.log('Admin user created!');

  for (let i = 1; i <= 100; i++) {
    await User.create({
      username: `employee${i}`,
      password: await bcrypt.hash('password', 10),
      role: 'employee'
    });
  }

  console.log('100 dummy employees created!');
  process.exit();
})();
