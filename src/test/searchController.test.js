const request = require('supertest');
const express = require('express');
const router = require('../routes/index.js');
const { normalizeString, containsWord } = require('../utils/utils.js');

const app = express();
app.use(router);
describe('Search Controller', () => {

    it('should return highlights and suggestions based on a valid search', async () => {
        const res = await request(app).get('/').query({ q: 'neymar' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('highlights');
        expect(res.body).toHaveProperty('suggestions');
        expect(res.body.suggestions).toBeInstanceOf(Array);
    });

    it('should return a url for search when a search does not have matches', async () => {
        const res = await request(app).get('/').query({ q: 'natal' });
        console.log(res.body)
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('url');

    });
});

