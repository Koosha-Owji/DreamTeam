// import { createRequire } from "module";
// const require = createRequire(import.meta.url);

// var expect = require("chai").expect;
// import app from "../server.js";
// var request = require("supertest");

// describe("Account Page", function () {
//   var user = request.agent(app);

//   var user_id = "612f26232f5742b8e89cb522";

//   describe("POST /user/signin", function () {
//     it("It should sigin successfully with valid credentials", (done) => {
//       const userCredentials = {
//         email_address: "test@test.com",
//         password: "test",
//       };
//       this.timeout(10000);
//       user
//         .post("/user/signin")
//         .send(userCredentials)
//         .end((err, response) => {
//           expect(response.statusCode).to.equal(200);
//           expect(response.body.result._id).to.equal(user_id);
//         });
//       done();
//     });

//     it("It should not sigin successfully with an invalid email address", (done) => {
//       const userCredentials = {
//         email_address: "test",
//         password: "test",
//       };
//       this.timeout(10000);
//       user
//         .post("/user/signin")
//         .send(userCredentials)
//         .end((err, response) => {
//           expect(response.statusCode).to.equal(404);
//           expect(response.body.message).to.equal("User doesn't exist");
//         });
//       done();
//     });

//     it("It should not sigin successfully with an invalid password", (done) => {
//       const userCredentials = {
//         email_address: "test@test.com",
//         password: "abc123",
//       };
//       this.timeout(10000);
//       user
//         .post("/user/signin")
//         .send(userCredentials)
//         .end((err, response) => {
//           expect(response.statusCode).to.equal(400);
//           expect(response.body.message).to.equal("Invalid credentials");
//         });
//       done();
//     });

//     it("It should not sigin successfully without a valid email and password", (done) => {
//       this.timeout(10000);
//       user.post("/user/signin").end((err, response) => {
//         expect(response.statusCode).to.equal(404);
//         expect(response.body.message).to.equal("User doesn't exist");
//       });
//       done();
//     });
//   });

//   describe("POST /user/signup", function () {
//     // ONLY WOKRS IF THERE IS NO TEST ACCOUNT IN THE DATABASE
//     // it("It should successfully create a new account", (done) => {
//     //   const userDetails = {
//     //     first_name: 'Test',
//     //     last_name: 'Test',
//     //     email_address: 'Test',
//     //     department: 'Test',
//     //     role: 'Test',
//     //     password: 'test',
//     //   };
//     //   this.timeout(10000);
//     //   user
//     //     .post("/user/signup")
//     //     .send(userDetails)
//     //     .end((err, response) => {
//     //       expect(response.statusCode).to.equal(201);
//     //     });
//     //   done();
//     // });

//     it("It should not create a new account with a pre existing email", (done) => {
//       const userDetails = {
//         first_name: "Test",
//         last_name: "Test",
//         email_address: "test@test.com",
//         department: "Test",
//         role: "Test",
//         password: "test",
//       };
//       this.timeout(10000);
//       user
//         .post("/user/signup")
//         .send(userDetails)
//         .end((err, response) => {
//           expect(response.statusCode).to.equal(400);
//           expect(response.body.message).to.equal("User already exists");
//         });
//       done();
//     });
//   });
// });