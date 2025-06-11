const { sequelize, initModels } = require('../src/models');

module.exports = async () => {
  await initModels();
  await sequelize.sync({ force: true }); // reset tabel
};
