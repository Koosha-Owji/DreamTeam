/**
 * contact_page_integration.test.js, contains integration tests for the Contacts Page
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

var expect = require("chai").expect;
import app from "../server.js";
var request = require("supertest");

describe("Contacts Page", function () {
    var token;
    var authenticatedUser = request.agent(app);
  
    var contact_to_delete_id;
  
    before(function (done) {
    const userCredentials = {
        email_address: "test@test.com",
        password: "Abc123",
        };
    
        var user_id = "612f26232f5742b8e89cb522";
  
      //Log in a user Using UserCredentials
      this.timeout(10000);
      authenticatedUser
        .post("/user/signin")
        .send(userCredentials)
        .end(function (err, response) {
          expect(response.body.result._id).to.equal(user_id);
          expect(response.statusCode).to.equal(200);
          token = response.body.token;
          done();
        });
    });

    describe("GET /contact/get_all", function () {
        it("should return a 200 response if the user is logged in", function (done) {
          authenticatedUser
            .get("/contact/get_all_contacts")
            .set("authorization", `Bearer ${token}`)
            .expect(200);
          done();
        });
    
    });

    describe("POST /contact/add", function () {
        it("It should create a new contact", (done) =>{
            const contact = {
                first_name: "Test",
                last_name: "Contact",
                business: "Testing",
                relationship: "Testing",
                email_address: "test@gmail.com", 
                phone_number: "+61 test",
                description: "testing contact",
            }
            authenticatedUser
            .post("/contact/")
            .send(contact)
            .set("authorization", `Bearer ${token}`)
            .end((err, response) => {
                contact_to_delete_id = response.body._id;
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                // expect(response.body.business).to.equal(contact.business);
                done();
            });
        });

        it("new contact shouldn't be created if first name is empty", (done) => {
            const contact_no_first_name = {
                last_name: "Contact",
                business: "Testing",
                relationship: "Testing", 
                email_address: "test@gmail.com", 
                phone_number: "+61 test",
                description: "testing contact",
            }

            authenticatedUser
            .post("/contact/")
            .send(contact_no_first_name)
            .set("authorization", `Bearer ${token}`)
            .end((err, response) => {
                expect(response.statusCode).to.equal(400);
                expect(response.body.message).to.equal(
                    "Contact does not have any first name and/or email"
                );
            done();
            });

        });

        it("new contact shouldn't be created if email address is empty", (done) => {
            const contact_no_email_address = {
                first_name: "Test",
                last_name: "Contact",
                business: "Testing",
                relationship: "Testing",
                phone_number: "+61 test",
                description: "testing contact",
            }

            authenticatedUser
            .post("/contact/")
            .send(contact_no_email_address)
            .set("authorization", `Bearer ${token}`)
            .end((err, response) => {
                expect(response.statusCode).to.equal(400);
                expect(response.body.message).to.equal(
                    "Contact does not have any first name and/or email"
                );
            done();
            });

        });

    });

    describe("PATCH /contact/update/:id", function(){
        it("It should PATCH an existing contact", (done) => {
            const contact = {
                first_name: "Test edit",
                last_name: "Contact edit",
                business: "Testing edit",
                relationship: "Testing edit",
                email_address: "test@gmail.com edit", 
                phone_number: "+61 test edit",
                description: "testing contact edit",
            }
            authenticatedUser
              .patch("/contact/update/" + contact_to_delete_id)
              .send(contact)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                done();
              });
        });

        it("It should PATCH an existing contact with only a first name change", (done) => {
            const contact = {
                first_name: "Test edit 2",
                last_name: "Contact edit",
                business: "Testing edit",
                relationship: "Testing edit",
                email_address: "test@gmail.com edit", 
                phone_number: "+61 test edit",
                description: "testing contact edit",
            }
            authenticatedUser
              .patch("/contact/update/" + contact_to_delete_id)
              .send(contact)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                done();
              });
        });

        it("It should PATCH an existing contact with only a last name change", (done) => {
            const contact = {
                first_name: "Test edit 2",
                last_name: "Contact edit 2",
                business: "Testing edit",
                relationship: "Testing edit",
                email_address: "test@gmail.com edit", 
                phone_number: "+61 test edit",
                description: "testing contact edit",
            }
            authenticatedUser
              .patch("/contact/update/" + contact_to_delete_id)
              .send(contact)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                done();
              });
        });

        it("It should PATCH an existing contact with only a business change", (done) => {
            const contact = {
                first_name: "Test edit 2",
                last_name: "Contact edit 2",
                business: "Testing edit 2",
                relationship: "Testing edit",
                email_address: "test@gmail.com edit", 
                phone_number: "+61 test edit",
                description: "testing contact edit",
            }
            authenticatedUser
              .patch("/contact/update/" + contact_to_delete_id)
              .send(contact)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                done();
              });
        });

        it("It should PATCH an existing contact with only a relationship change", (done) => {
            const contact = {
                first_name: "Test edit 2",
                last_name: "Contact edit 2",
                business: "Testing edit 2",
                relationship: "Testing edit 2",
                email_address: "test@gmail.com edit", 
                phone_number: "+61 test edit",
                description: "testing contact edit",
            }
            authenticatedUser
              .patch("/contact/update/" + contact_to_delete_id)
              .send(contact)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                done();
              });
        });

        it("It should PATCH an existing contact with only a email address change", (done) => {
            const contact = {
                first_name: "Test edit 2",
                last_name: "Contact edit 2",
                business: "Testing edit 2",
                relationship: "Testing edit 2",
                email_address: "test@gmail.com edit 2", 
                phone_number: "+61 test edit",
                description: "testing contact edit",
            }
            authenticatedUser
              .patch("/contact/update/" + contact_to_delete_id)
              .send(contact)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                done();
              });
        });

        it("It should PATCH an existing contact with only a phone address change", (done) => {
            const contact = {
                first_name: "Test edit 2",
                last_name: "Contact edit 2",
                business: "Testing edit 2",
                relationship: "Testing edit 2",
                email_address: "test@gmail.com edit 2", 
                phone_number: "+61 test edit 2",
                description: "testing contact edit",
            }
            authenticatedUser
              .patch("/contact/update/" + contact_to_delete_id)
              .send(contact)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                done();
              });
        });

        it("It should PATCH an existing contact with only a description change", (done) => {
            const contact = {
                first_name: "Test edit 2",
                last_name: "Contact edit 2",
                business: "Testing edit 2",
                relationship: "Testing edit 2",
                email_address: "test@gmail.com edit 2", 
                phone_number: "+61 test edit 2",
                description: "testing contact edit 2",
            }
            authenticatedUser
              .patch("/contact/update/" + contact_to_delete_id)
              .send(contact)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.first_name).to.equal(contact.first_name);
                expect(response.body.last_name).to.equal(contact.last_name);
                expect(response.body.business).to.equal(contact.business);
                expect(response.body.relationship).to.equal(contact.relationship);
                expect(response.body.email_address).to.equal(contact.email_address);
                expect(response.body.phone_number).to.equal(contact.phone_number);
                expect(response.body.description).to.equal(contact.description);
                done();
              });
        });
    });

    describe("POST /contact/delete/:id", function (){
        it("It should delete an existing contact", (done) => {
            authenticatedUser
            .post("/contact/delete/" + contact_to_delete_id)
            .set("authorization", `Bearer ${token}`)
            .end((err, response) => {
            expect(response.statusCode).to.equal(200);
            // expect(response.body.message).to.equal(
            //     "Contact deleted."
            // );
            done();
            });
          });
    });
    
});