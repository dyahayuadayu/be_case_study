const reimbursementRepo = require('../repositories/reimbursement.repository');

const submitReimbursement = async (user_id, { date, amount, description }, context) => {
  if (amount <= 0) {
    throw new Error('Amount must be greater than 0');
  }

  return reimbursementRepo.createReimbursement({
    user_id,
    date,
    amount,
    description,
    created_by: user_id
  }, context);
};

module.exports = { submitReimbursement };
