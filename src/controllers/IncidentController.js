const connection = require('../database/connection');

module.exports = {
  async index(req, res) {
    // Pagination
    const { page = 1 } = req.query;

    // Total of pages
    const [count] = await connection('incidents').count();
    // count[0]
    console.log(count);

    const incidents = await connection('incidents')
      // Join other data here with incidents, to show to the user the 'ONG's' data as well and not only the incident data.
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Grab the incident/ONG with the ONG itself.
      // Pagination
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*', // the data from 'incidents',
        'ongs.name', // Specific data from the ONG.
        'ongs.email', // Specific data from the ONG.
        'ongs.whatsapp', // Specific data from the ONG.
        'ongs.city', // Specific data from the ONG.
        'ongs.uf' // Specific data from the ONG.
      ]);

      // Total of pages
      res.header('X-Total-Count', count['count(*)']);

    return res.json(incidents);
  },

  async create(req, res) {
    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id
    });
    // const id = result[0];

    return res.json({ id });

  },

  async delete(req, res) {
    const { id } = req.params; // Incident id
    const ong_id = req.headers.authorization; // Logged ONG

    // Check if the ONG owner the incident that it wants to delete.
    const incident = await connection('incidents')
      .where('id', id) // Search for an incident which 'id' is equal to the id (req.params).
      .select('ong_id') // Select only the 'ong_id' column.
      .first(); // Return only one result.

    if ( incident.ong_id !== ong_id ) {
      return res.status(401).json({ error: 'Operation not permitted '}); // 401 = Unauthorized
    }

    // IF it passed, if it's okay, delete.
    await connection('incidents').where('id', id).delete();

    return res.status(204).send(); // 204 = No Content
  }
};
