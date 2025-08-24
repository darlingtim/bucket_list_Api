const request = require('supertest');
const express = require('express');
const bucketlist = require('../model/bucketlists');

jest.mock('../model/bucketlists', () => ({
    getAllBucketlists: jest.fn(),
    getBucketlistByInputName: jest.fn(),
    createBucketlist: jest.fn(),
    addBucketlistItem: jest.fn(),
    deleteBucketlistById: jest.fn(),
    getSingleBucketlistById: jest.fn(),
}));

const api = require('../routes/api');

function createApp() {
    const app = express();
    app.use(express.json());
    // inject test user
    app.use((req, res, next) => {
        req.user = { username: 'testuser', name: 'Test User' };
        next();
    });
    app.use('/api', api);
    return app;
}

describe('API router - integration tests (HTTP)', () => {
    let app;
    beforeEach(() => {
        app = createApp();
        jest.clearAllMocks();
    });

    test('GET /api/register -> REGISTER', async () => {
        const res = await request(app).get('/api/register');
        expect(res.status).toBe(200);
        expect(res.text).toBe('REGISTER');
    });

    test('POST /api/authenticate -> AUTHENTICATE', async () => {
        const res = await request(app).post('/api/authenticate').send({});
        expect(res.status).toBe(200);
        expect(res.text).toBe('AUTHENTICATE');
    });

    test('GET /api/profile -> PROFILE', async () => {
        const res = await request(app).get('/api/profile');
        expect(res.status).toBe(200);
        expect(res.text).toBe('PROFILE');
    });

    test('GET /api/validate -> VALIDATE', async () => {
        const res = await request(app).get('/api/validate');
        expect(res.status).toBe(200);
        expect(res.text).toBe('VALIDATE');
    });

    test('GET /api/bucketlists (no q) -> returns message when empty', async () => {
        bucketlist.getAllBucketlists.mockImplementation((username, cb) => cb(null, []));
        const res = await request(app).get('/api/bucketlists');
        expect(res.status).toBe(200);
        expect(res.text).toBe('Test User, Sorry you dont have a bucketList yet. Please create one!');
    });

    test('GET /api/bucketlists (no q) -> returns array when present', async () => {
        const lists = [{ id: '1', name: 'one' }];
        bucketlist.getAllBucketlists.mockImplementation((username, cb) => cb(null, lists));
        const res = await request(app).get('/api/bucketlists');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(lists);
    });

    test('GET /api/bucketlists?q=abc -> returns filtered lists', async () => {
        const lists = [{ id: '2', name: 'abc' }];
        bucketlist.getBucketlistByInputName.mockImplementation((username, q, cb) => cb(null, lists));
        const res = await request(app).get('/api/bucketlists').query({ q: 'abc' });
        expect(res.status).toBe(200);
        expect(res.body).toEqual(lists);
    });

    test('POST /api/bucketlists ->  creates new bucketlist and returns success message', async () => {
        bucketlist.createBucketlist.mockImplementation((newList, cb) => cb(null, { name: 'NewList' }));
        const res = await request(app).post('/api/bucketlists').send({ name: 'NewList' });
        expect(res.status).toBe(200);
        expect(res.text).toBe('New BucketList NewList was Successfully created');
    });

    test('PUT /api/bucketlists/:bucketId/items/ -> adds item and returns result', async () => {
        const result = { ok: true, id: 'item1' };
        bucketlist.addBucketlistItem.mockImplementation((id, item, cb) => cb(null, result));
        const payload = { name: 'item1', done: false, bucketlistId: 'bid' };
        const res = await request(app).put('/api/bucketlists/bid/items/').send(payload);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(result);
    });

    test('DELETE /api/bucketlists/:bucketlistId -> deletes and returns result', async () => {
        const result = { success: true };
        bucketlist.deleteBucketlistById.mockImplementation((id, cb) => cb(null, result));
        const res = await request(app).delete('/api/bucketlists/bid');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(result);
    });

    test('GET /api/bucketlists/:bucketlistId -> returns single bucketlist', async () => {
        const result = { id: 'bid', name: 'single' };
        bucketlist.getSingleBucketlistById.mockImplementation((username, id, cb) => cb(null, result));
        const res = await request(app).get('/api/bucketlists/bid');
        expect(res.status).toBe(200);
        expect(res.body).toEqual(result);
    });
});