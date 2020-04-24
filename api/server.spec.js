const request = require("supertest");

const server = require("./server");
const db = require('../database/dbConfig.js');

describe("server", function () {

    describe("POST /api/register", function () {
        beforeEach(async () => {
          await db("users").truncate(); // empty the table and reset the id back to 1
        });
    
        it("return 201 on success", async () => {
            const response = await request(server)
                .post("/api/auth/register")
                .send({ username: "registerTest", password: "registerPass" })
                expect(response.status).toBe(201);
        });

        it('should return a property of username', function () {
            return request(server)
                .post("/api/auth/register")
                .send({ username: "registerTest", password: "registerPass" })
                .then(res => {
                expect(res.body.username).toBe("registerTest");
                });
        });
    })

    describe("POST /api/login", function () {

        it("return 200 on success", async () => {
            const response = await request(server)
                .post("/api/auth/login")
                .send({ username: "registerTest", password: "registerPass" })
                expect(response.status).toBe(200);
        });

        it('should return a welcome message', function () {
            return request(server)
                .post("/api/auth/login")
                .send({ username: "registerTest", password: "registerPass" })
                .then(res => {
                expect(res.body.message).toBe("Welcome to Dad Jokes!");
                });
        });
    })
    
    describe("GET /api/jokes", function () {

        it("should ask to login if no token", function () {
            return request(server)
                .get('/api/jokes')
                .then(res => {
                    expect(res.body.message).toBe( "Please log in.")
                })
        })

        it("should display jokes if token", async function () {

            const response = await request(server)
                .get("/api/jokes")
                .set("Content-type", "application/json")
                .set("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoicmVnaXN0ZXJUZXN0IiwiaWF0IjoxNTg3NzQ5NDMyLCJleHAiOjE1ODc4MzU4MzJ9.ZUfapSma1BZayeSa62Wh0YM6Z2EsimcWmb8pBZNGBSU")
                expect(response.status).toBe(200);
        })
    })
})