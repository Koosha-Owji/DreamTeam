import { createRequire } from "module";
const require = createRequire(import.meta.url);

var expect = require("chai").expect;
import app from "../server.js";
var request = require("supertest");

describe("Orders Page", function () {
    var token;
    var authenticatedUser = request.agent(app);
  
    var order_to_delete_id;
  
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

    describe("GET /order/get_all", function () {
        it("should return a 200 response if the user is logged in", function (done) {
          authenticatedUser
            .get("/order/get_all")
            .set("authorization", `Bearer ${token}`)
            .expect(200);
          done();
        });
    
    });

    describe("POST /order/add", function () {
        it("It should create a new contact", (done) =>{
            const order = {
                order_date:"2021-10-10",
                due_date:"2022-10-10",
                product:"Test",
                stage:"Ordered",
                amount:"1",
                contact_id:"616fe687b8f50f19a0cc5723"
            }
            authenticatedUser
            .post("/order/add")
            .send(order)
            .set("authorization", `Bearer ${token}`)
            .end((err,response) => {
                order_to_delete_id = response.body._id;
                expect(response.statusCode).to.equal(200);
                expect(response.body.order_date).to.equal(order.order_date);
                expect(response.body.due_date).to.equal(order.due_date);
                expect(response.body.product).to.equal(order.product);
                expect(response.body.stage).to.equal(order.stage);
                expect(response.body.amount).to.equal(order.amount);
                expect(response.body.contact_id).to.equal(order.contact_id);
                done();
            });
        });

        // it("new contact shouldn't be created if first name is empty", (done) => {
        //     const contact_no_first_name = {
        //         last_name: "Contact",
        //         business: "Testing",
        //         relationship: "Testing", 
        //         email_address: "test@gmail.com", 
        //         phone_number: "+61 test",
        //         description: "testing contact",
        //     }

        //     authenticatedUser
        //     .post("/contact/")
        //     .send(contact_no_first_name)
        //     .set("authorization", `Bearer ${token}`)
        //     .end((err, response) => {
        //         expect(response.statusCode).to.equal(400);
        //         expect(response.body.message).to.equal(
        //             "Contact does not have any first name and/or email"
        //         );
        //     done();
        //     });

        // });

        // it("new contact shouldn't be created if email address is empty", (done) => {
        //     const contact_no_email_address = {
        //         first_name: "Test",
        //         last_name: "Contact",
        //         business: "Testing",
        //         relationship: "Testing",
        //         phone_number: "+61 test",
        //         description: "testing contact",
        //     }

        //     authenticatedUser
        //     .post("/contact/")
        //     .send(contact_no_email_address)
        //     .set("authorization", `Bearer ${token}`)
        //     .end((err, response) => {
        //         expect(response.statusCode).to.equal(400);
        //         expect(response.body.message).to.equal(
        //             "Contact does not have any first name and/or email"
        //         );
        //     done();
        //     });

        // });

    });

    describe("PATCH /order/update/:id", function(){
        it("It should PATCH an existing order", (done) => {
            const order = {
                order_date:"2022-10-10",
                due_date:"2023-10-10",
                product:"Test edit",
                stage:"Completed",
                amount:"2",
                contact_id:"616fe6aeb8f50f19a0cc5724"
            }
            authenticatedUser
              .patch("/order/update/" + order_to_delete_id)
              .send(order)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.order_date).to.equal(order.order_date);
                expect(response.body.due_date).to.equal(order.due_date);
                expect(response.body.product).to.equal(order.product);
                expect(response.body.stage).to.equal(order.stage);
                expect(response.body.amount).to.equal(order.amount);
                expect(response.body.contact_id).to.equal(order.contact_id);
                done();
              });
        });

        it("It should PATCH an existing order with only a order date change", (done) => {
            const order = {
                order_date:"2022-10-11",
                due_date:"2023-10-10",
                product:"Test edit",
                stage:"Completed",
                amount:"2",
                contact_id:"616fe6aeb8f50f19a0cc5724"
            }
            authenticatedUser
              .patch("/order/update/" + order_to_delete_id)
              .send(order)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.order_date).to.equal(order.order_date);
                expect(response.body.due_date).to.equal(order.due_date);
                expect(response.body.product).to.equal(order.product);
                expect(response.body.stage).to.equal(order.stage);
                expect(response.body.amount).to.equal(order.amount);
                expect(response.body.contact_id).to.equal(order.contact_id);
                done();
              });
        });

        it("It should PATCH an existing order with only a due date change", (done) => {
            const order = {
                order_date:"2022-10-11",
                due_date:"2023-10-11",
                product:"Test edit",
                stage:"Completed",
                amount:"2",
                contact_id:"616fe6aeb8f50f19a0cc5724"
            }
            authenticatedUser
              .patch("/order/update/" + order_to_delete_id)
              .send(order)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.order_date).to.equal(order.order_date);
                expect(response.body.due_date).to.equal(order.due_date);
                expect(response.body.product).to.equal(order.product);
                expect(response.body.stage).to.equal(order.stage);
                expect(response.body.amount).to.equal(order.amount);
                expect(response.body.contact_id).to.equal(order.contact_id);
                done();
              });
        });

        it("It should PATCH an existing order with only a product change", (done) => {
            const order = {
                order_date:"2022-10-11",
                due_date:"2023-10-11",
                product:"Test edit 2",
                stage:"Completed",
                amount:"2",
                contact_id:"616fe6aeb8f50f19a0cc5724"
            }
            authenticatedUser
              .patch("/order/update/" + order_to_delete_id)
              .send(order)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.order_date).to.equal(order.order_date);
                expect(response.body.due_date).to.equal(order.due_date);
                expect(response.body.product).to.equal(order.product);
                expect(response.body.stage).to.equal(order.stage);
                expect(response.body.amount).to.equal(order.amount);
                expect(response.body.contact_id).to.equal(order.contact_id);
                done();
              });
        });

        it("It should PATCH an existing order with only a stage change", (done) => {
            const order = {
                order_date:"2022-10-11",
                due_date:"2023-10-11",
                product:"Test edit 2",
                stage:"Delivered",
                amount:"2",
                contact_id:"616fe6aeb8f50f19a0cc5724"
            }
            authenticatedUser
              .patch("/order/update/" + order_to_delete_id)
              .send(order)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.order_date).to.equal(order.order_date);
                expect(response.body.due_date).to.equal(order.due_date);
                expect(response.body.product).to.equal(order.product);
                expect(response.body.stage).to.equal(order.stage);
                expect(response.body.amount).to.equal(order.amount);
                expect(response.body.contact_id).to.equal(order.contact_id);
                done();
              });
        });

        it("It should PATCH an existing order with only an amount change", (done) => {
            const order = {
                order_date:"2022-10-11",
                due_date:"2023-10-11",
                product:"Test edit 2",
                stage:"Delivered",
                amount:"3",
                contact_id:"616fe6aeb8f50f19a0cc5724"
            }
            authenticatedUser
              .patch("/order/update/" + order_to_delete_id)
              .send(order)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.order_date).to.equal(order.order_date);
                expect(response.body.due_date).to.equal(order.due_date);
                expect(response.body.product).to.equal(order.product);
                expect(response.body.stage).to.equal(order.stage);
                expect(response.body.amount).to.equal(order.amount);
                expect(response.body.contact_id).to.equal(order.contact_id);
                done();
              });
        });

        it("It should PATCH an existing order with only a contact change", (done) => {
            const order = {
                order_date:"2022-10-11",
                due_date:"2023-10-11",
                product:"Test edit 2",
                stage:"Delivered",
                amount:"3",
                contact_id:"617897e8872b20ef7498bde1"
            }
            authenticatedUser
              .patch("/order/update/" + order_to_delete_id)
              .send(order)
              .set("authorization", `Bearer ${token}`)
              .end((err, response) => {
                expect(response.statusCode).to.equal(200);
                expect(response.body.order_date).to.equal(order.order_date);
                expect(response.body.due_date).to.equal(order.due_date);
                expect(response.body.product).to.equal(order.product);
                expect(response.body.stage).to.equal(order.stage);
                expect(response.body.amount).to.equal(order.amount);
                expect(response.body.contact_id).to.equal(order.contact_id);
                done();
              });
        });

    });

    describe("POST /order/delete/:id", function (){
        it("It should delete an existing order", (done) => {
            authenticatedUser
            .post("/order/delete/" + order_to_delete_id)
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