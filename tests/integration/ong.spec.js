const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
  beforeEach( async () => {
    await connection.migrate.latest();
  });

  it('should be able to create a new NGO', async () => {

    const response = await request(app)
      .post('/ongs')
      .send({
        name: "APAD2",
        email: "contact@test.com",
        whatsapp: "11111111111",
        city: "Americana",
        uf: "SP"
      });

      console.log(response.body);
  });
});
