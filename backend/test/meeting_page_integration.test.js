/**
 * meeting_page_integration.test.js, contains integration test for the Meeting page
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);

var expect = require("chai").expect;
import app from "../server.js";
var request = require("supertest");

describe("Meetings Page", function () {
  var token;
  var authenticatedUser = request.agent(app);

  var meeting_id;

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

  describe("GET /meeting/get_all", function () {
    it("should return a 200 response if the user is logged in", function (done) {
      authenticatedUser
        .get("/meeting/get_all")
        .set("authorization", `Bearer ${token}`)
        .expect(200);
      done();
    });

    // CANT TEST DUE TO THE SPLIT ISSUE?
    // it("should return a 302 response and redirect to /login", function (done) {
    //   request(app)
    //     .get("/note/get_all")
    //     .set("authorization", `Bearer ${1234}`)
    //     .expect("Location", "/login")
    //     .expect(302, done);
    // });
  });

  describe("POST /meeting/create", function () {
    it("It should create a new Meeting", (done) => {
      const meeting = {
        title: "Test",
        agenda: "Test Agenda",
        date: "2021-10-10",
        time: "05:50:59",
        non_contact_attendees: "Name1, Name2, Name3",
        endtime: "06:50:38",
      };
      authenticatedUser
        .post("/meeting/create")
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          meeting_id = response.body._id;
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(meeting.title);
          expect(response.body.agenda).to.equal(meeting.agenda);
          expect(response.body.date).to.equal(meeting.date);
          expect(response.body.time).to.equal(meeting.time);
          done();
        });
    });
    // Date not in correct format
    // Time not in correct format
    it("It should not create a new meeting when the date is empty", (done) => {
      const meeting = {
        title: "Test",
        agenda: "Test Agenda",
        time: "05:50:59",
        non_contact_attendees: "Name1, Name2, Name3",
      };
      authenticatedUser
        .post("/meeting/create")
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.message).to.equal("Missing Parameters");
          done();
        });
    });

    it("It should not create a new meeting when the time is empty", (done) => {
      const meeting = {
        title: "Test",
        agenda: "Test Agenda",
        date: "2021-10-10",
        non_contact_attendees: "Name1, Name2, Name3",
      };
      authenticatedUser
        .post("/meeting/create")
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.message).to.equal("Missing Parameters");
          done();
        });
    });

    it("It should not create a new meeting when the title is empty", (done) => {
      const meeting = {
        agenda: "Test Agenda",
        date: "2021-10-10",
        time: "05:50:59",
        non_contact_attendees: "Name1, Name2, Name3",
      };
      authenticatedUser
        .post("/meeting/create")
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.message).to.equal("Missing Parameters");
          done();
        });
    });

    it("It should not create a meeting with incorrect date format", (done) => {
      const meeting = {
        title: "Test",
        agenda: "Test Agenda",
        date: "2021/10-10",
        time: "05:50:59",
        non_contact_attendees: "Name1, Name2, Name3",
        endtime: "06:50:59",
      };
      authenticatedUser
        .post("/meeting/create")
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(500);
          expect(response.body.message).to.equal("Meeting creation failed");
          done();
        });
    });

    it("It should create a meeting with incorrect time format", (done) => {
      const meeting = {
        title: "Test",
        agenda: "Test Agenda",
        date: "2021-10-10",
        time: "05-50-59",
        non_contact_attendees: "Name1, Name2, Name3",
        endtime: "06-50-59",
      };
      authenticatedUser
        .post("/meeting/create")
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(500);
          expect(response.body.message).to.equal("Meeting creation failed");
          done();
        });
    });
  });

  describe("PATCH /meeting/update/:id", function () {
    it("It should PATCH an existing meeting", (done) => {
      const meeting = {
        title: "Test Edit",
        agenda: "Test Agenda Edit",
        date: "2022-10-10",
        time: "05:50:59",
        non_contact_attendees: "Name1 Edit, Name2, Name3",
        endtime: "06:50:59",
      };
      authenticatedUser
        .patch("/meeting/update/" + meeting_id)
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(meeting.title);
          expect(response.body.agenda).to.equal(meeting.agenda);
          expect(response.body.date).to.equal(meeting.date);
          expect(response.body.time).to.equal(meeting.time);
          done();
        });
    });

    it("It should PATCH an existing meeting with changes only in title", (done) => {
      const meeting = {
        title: "Test Edit 2",
        agenda: "Test Agenda Edit",
        date: "2022-10-10",
        time: "05:50:59",
        non_contact_attendees: "Name1 Edit, Name2, Name3",
        endtime: "06:50:59",
      };
      authenticatedUser
        .patch("/meeting/update/" + meeting_id)
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(meeting.title);
          expect(response.body.agenda).to.equal(meeting.agenda);
          expect(response.body.date).to.equal(meeting.date);
          expect(response.body.time).to.equal(meeting.time);
          done();
        });
    });

    it("It should PATCH an existing meeting changes only in date", (done) => {
      const meeting = {
        title: "Test Edit",
        agenda: "Test Agenda Edit",
        date: "2021-11-10",
        time: "05:50:59",
        non_contact_attendees: "Name1 Edit, Name2, Name3",
        endtime: "06:50:59",
      };
      authenticatedUser
        .patch("/meeting/update/" + meeting_id)
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(meeting.title);
          expect(response.body.agenda).to.equal(meeting.agenda);
          expect(response.body.date).to.equal(meeting.date);
          expect(response.body.time).to.equal(meeting.time);
          done();
        });
    });

    it("It should PATCH an existing meeting with changes only in time", (done) => {
      const meeting = {
        title: "Test Edit",
        agenda: "Test Agenda Edit",
        date: "2022-10-10",
        time: "05:55:09",
        non_contact_attendees: "Name1 Edit, Name2, Name3",
        endtime: "06:50:59",
      };
      authenticatedUser
        .patch("/meeting/update/" + meeting_id)
        .send(meeting)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(meeting.title);
          expect(response.body.agenda).to.equal(meeting.agenda);
          expect(response.body.date).to.equal(meeting.date);
          expect(response.body.time).to.equal(meeting.time);
          done();
        });
    });
  });
  describe("PATCH /meeting/mark_completed/:id", function () {
    it("It should PATCH an existing meeting and update the time to past, to mark meeting as completed", (done) => {
      authenticatedUser
        .patch("/meeting/mark_completed/" + meeting_id)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          done();
        });
    });
  });

  describe("DELETE /meeting/delete/:id", function () {
    it("It should delete an existing meeting", (done) => {
      authenticatedUser
        .delete("/meeting/delete/" + meeting_id)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.text).to.equal(
            "Successfully deleted meeting (or meeting does not exist or user is not authorised)"
          );
          done();
        });
    });

    it("It should not give an error for a non-existing note", (done) => {
      authenticatedUser
        .delete("/meeting/delete/" + 1234)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.text).to.equal(
            "Successfully deleted meeting (or meeting does not exist or user is not authorised)"
          );
          done();
        });
    });
  });
});
