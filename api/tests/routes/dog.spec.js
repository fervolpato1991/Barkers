/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Dog, conn } = require('../../src/db.js');

const agent = session(app);
const dog = {
  name: 'Pug',
};

describe('Videogame routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));

  beforeEach(async () => {
    await Dog.sync({ force: true });
    await Dog.create(dog);
  });

  describe('GET /dogs', () => {
    it('should respond with status 200', async () => {
      const response = await agent.get('/dogs');
      expect(response.status).to.equal(200);
    });
  });

  describe('POST /dogs', () => {
    it('should create a new dog', async () => {
      const newDog = {
        name: 'Bulldog',
        image: 'bulldog.jpg',
        minWeight: 20,
        maxWeight: 30,
        minHeight: 30,
        maxHeight: 40,
        temperaments: ['Friendly', 'Loyal'],
        minLifeSpan: 10,
        maxLifeSpan: 12,
      };

      const response = await agent.post('/dogs').send(newDog);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body.message).to.include(newDog.name);
      expect(response.body.message).to.include(newDog.id.toString());
    });

    it('should return an error when no temperaments are provided', async () => {
      const newDog = {
        name: 'Bulldog',
        image: 'bulldog.jpg',
        minWeight: 20,
        maxWeight: 30,
        minHeight: 30,
        maxHeight: 40,
        temperaments: [],
        minLifeSpan: 10,
        maxLifeSpan: 12,
      };

      const response = await agent.post('/dogs').send(newDog);
      expect(response.status).to.equal(400);
      expect(response.body).to.have.property('error');
      expect(response.body.error).to.be.a('string');
      expect(response.body.error).to.include('need at least one temperament');
    });
  });

  describe('DELETE /dogs/:id', () => {
    it('should delete a dog by ID', async () => {
      const existingDog = await Dog.findOne({ where: { name: 'Pug' } });
      const dogId = existingDog.id;

      const response = await agent.delete(`/dogs/${dogId}`);
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.be.a('string');
      expect(response.body.message).to.include('Dog removed');

      const deletedDog = await Dog.findByPk(dogId);
      expect(deletedDog).to.be.null;
    });
  });
});
