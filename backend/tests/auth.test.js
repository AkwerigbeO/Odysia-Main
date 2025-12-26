const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../server'); // We need to export app from server.js

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.disconnect(); // Disconnect any existing connection
    await mongoose.connect(uri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

describe('Auth Endpoints', () => {
    const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
    };

    it('should register a new user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(userData);

        if (res.statusCode !== 201) {
            console.log('Register Error:', res.statusCode, res.body);
        }

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
        expect(res.body).toHaveProperty('email', userData.email);
    });

    it('should not register duplicate user', async () => {
        const res = await request(app)
            .post('/api/auth/register')
            .send(userData);

        expect(res.statusCode).toEqual(400);
    });

    it('should login user', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: userData.email,
                password: userData.password
            });

        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('token');
    });

    it('should fail login with wrong password', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: userData.email,
                password: 'wrongpassword'
            });

        expect(res.statusCode).toEqual(401);
    });
});
