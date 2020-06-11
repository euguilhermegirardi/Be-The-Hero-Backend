const crypto = require('crypto'); // To create the ONG's ID (from Node.js).

module.exports = function generateUniqueId() {
  return (
    crypto.randomBytes(4).toString('HEX') // ID generator.
  )
};
