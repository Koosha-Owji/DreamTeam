import { createRequire } from "module";
const require = createRequire(import.meta.url);

var expect = require("chai").expect;
import app from "../server.js";
var request = require("supertest");

describe("Notes Page", function () {
  var token;
  var authenticatedUser = request.agent(app);

  var note_to_delete_id;

  before(function (done) {
    const userCredentials = {
      email_address: "test@test.com",
      password: "test",
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

  describe("GET /note/get_all", function () {
    it("should return a 200 response if the user is logged in", function (done) {
      authenticatedUser
        .get("/note/get_all")
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

  describe (" name ", function() { // TEST SUITE
    it (" name ", function (){ // ACTUAL TEST

    });
  })

  describe("POST /note/add", function () {
    it("It should create a new Note", (done) => {
      const note = {
        title: "Test",
        content: "Test Content",
      };
      authenticatedUser
        .post("/note/add")
        .send(note)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          note_to_delete_id = response.body._id;
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(note.title);
          expect(response.body.content).to.equal(note.content);
          done();
        });
    });

    it("It should not create a new Note when the content is empty", (done) => {
      const note = {
        title: "Test",
      };
      authenticatedUser
        .post("/note/add")
        .send(note)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.message).to.equal(
            "Note does not have any Content"
          );
          done();
        });
    });
  });

  describe("PATCH /note/update/:id", function () {
    it("It should PATCH an existing note", (done) => {
      const note = {
        title: "Test Edit",
        content: "Test Edit",
      };
      authenticatedUser
        .patch("/note/update/" + note_to_delete_id)
        .send(note)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(note.title);
          expect(response.body.content).to.equal(note.content);
          done();
        });
    });

    it("It should PATCH an existing note with change in only content", (done) => {
      const note = {
        title: "Test Edit",
        content: "Test Edit 2",
      };
      authenticatedUser
        .patch("/note/update/" + note_to_delete_id)
        .send(note)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(note.title);
          expect(response.body.content).to.equal(note.content);
          done();
        });
    });

    it("It should PATCH an existing note with change in only title", (done) => {
      const note = {
        title: "Test Edit 2",
        content: "Test Edit 2",
      };
      authenticatedUser
        .patch("/note/update/" + note_to_delete_id)
        .send(note)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.body.title).to.equal(note.title);
          expect(response.body.content).to.equal(note.content);
          done();
        });
    });
  });

  describe("DELETE /note/delete/:id", function () {
    it("It should delete an existing note", (done) => {
      authenticatedUser
        .delete("/note/delete/" + note_to_delete_id)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.text).to.equal(
            "Successfully deleted note (or note does not exist)"
          );
          done();
        });
    });

    it("It should not give an error for a non-existing note", (done) => {
      authenticatedUser
        .delete("/note/delete/" + 1234)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.statusCode).to.equal(200);
          expect(response.text).to.equal(
            "Successfully deleted note (or note does not exist)"
          );
          done();
        });
    });
  });

  describe("GET /note/get_meeting_note/:meetingId", function () {
    const meeting_id = "616009d326793b00166d7c19";

    it("should return not return a note when the meeting does not have one", function (done) {
      authenticatedUser
        .get("/note/get_meeting_note/" + meeting_id)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.status).to.equal(500);
          expect(response.body.message).to.equal("Note retrieval failed");
        });
      done();
    });

    it("It should return status 200 when the meeting has a Note", function (done) {
      const meeting_id = "61600c9126793b00166d7c1a";
      authenticatedUser
        .get("/note/get_meeting_note/" + meeting_id)
        .set("authorization", `Bearer ${token}`)
        .end((err, response) => {
          expect(response.status).to.equal(200);
        });
      done();
    });
  });
});
