const connection = require('../database/connection');
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {

  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  },

  // Register new ONG
  async create(req, res) {
    const { name, email, whatsapp, city, uf} = req.body;
    //console.log(name);

    const id = generateUniqueId();

    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      uf
    });

    return res.json({ id }); // return the id only to connect the ONG in the application.
  }
};
