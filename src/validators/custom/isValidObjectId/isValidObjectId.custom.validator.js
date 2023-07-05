const { Types } = require('mongoose');

const isValidMongoId = (value) => {
  return Types.ObjectId.isValid(value);
};

module.exports = { isValidMongoId };
