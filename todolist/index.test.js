let app = require('./index.js');
let request = require('supertest');

describe("Root path test", () => {
    it ("respond to get method", () => {
        return request(app).get("/").then(response => {expect(response.statusCode).toBe(200)})

    })



})