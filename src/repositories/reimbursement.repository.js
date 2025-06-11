const { Reimbursement } = require('../models');

const createReimbursement = async (payload, context) => {
  return Reimbursement.create(payload, { context });
};

module.exports = { createReimbursement };
