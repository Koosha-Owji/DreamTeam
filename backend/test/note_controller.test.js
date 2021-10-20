import { createRequire } from "module";
import {
  create_note,
  delete_note,
  get_all_notes,
  update_note,
  get_one_note_by_meeting,
} from "../controllers/noteController.js";
import noteModel from "../models/note.js";
import userModel from "../models/user.js";
const require = createRequire(import.meta.url);

const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

// describe("Note Controller", function () {
//   describe("Create Note", function () {
//     let status, json, res;
//     beforeEach(() => {
//       status = sinon.stub();
//       json = sinon.spy();
//       res = { json, status };
//       status.returns(res);
//     });
//     const stubValue = [
//       {
//         id: faker.datatype.uuid(),
//         title: faker.random.words(),
//         content: faker.random.words(),
//         meeting_id: faker.datatype.uuid(),
//       },
//     ];
//     it(" Create a valid note", function () {
//       const req = { user_id: faker.datatype.uuid(), body: stubValue };
//       const stub = sinon.stub(userModel, "findOne").resolves(true);
//       const stub1 = sinon.stub(noteModel, "create").resolves([stubValue]);
//       const stub2 = sinon.stub("save").returns();

//       create_note(req, res);

//       expect(json.args[0][0]._id).equal(stubValue._id);
//       expect(json.args[0][0].title).equal(stubValue.title);
//       expect(json.args[0][0].content).equal(stubValue.content);
//       expect(json.args[0][0].meeting_id).equal(stubValue.meeting_id);
//       stub.restore();
//       stub1.restore();
//     });
//   });
// });

describe("Notes Controller", function () {
  describe("Create Note", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    const stubValue = [
      {
        id: faker.datatype.uuid(),
        title: faker.random.words(),
        content: faker.random.words(),
        meeting_id: faker.datatype.uuid(),
      },
    ];

    it("Creating Valid Note", async () => {
      const mReq = { user_id: "613ab597cbf2623120614c98", body: stubValue };
      const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
      const note = create_note(mReq, mReply);
      expect(note.id).equal(stubValue.id);
      expect(note.content).equal(stubValue.content);
      expect(note.title).equal(stubValue.title);
      expect(note.user_id).equal(stubValue.user_id);
      expect(note.meeting_id).equal(stubValue.meeting_id);
    });

    it("should not create a note when user id is empty", async function () {
      const req = { body: stubValue };
      create_note(req, res);
      expect(status.calledOnce).equal(true);
      expect(status.args[0][0]).equal(400);
      expect(json.calledOnce).equal(true);
      expect(json.args[0][0].message).equal("User doesn't exist");
    });
  });

  describe("Get Notes", function () {
    let newReq;
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    it("should return the notes that matches the user id", async function () {
      const stubValue = {
        _id: faker.datatype.uuid(),
        title: faker.random.words(),
        content: faker.random.words(),
        user_id: faker.datatype.uuid(),
        meeting_id: faker.datatype.uuid(),
      };
      const stub = sinon.stub(noteModel, "find").resolves([stubValue]);
      newReq = { user_id: "jghhh" };

      await get_all_notes(newReq, res);
      const notes = json.args[0][0];

      expect(notes[0]._id).equal(stubValue._id);
      expect(notes[0].title).equal(stubValue.title);
      expect(notes[0].content).equal(stubValue.content);
      expect(notes[0].user_id).equal(stubValue.user_id);
      expect(notes[0].meeting_id).equal(stubValue.meeting_id);
      expect(status.args[0][0]).equal(200);

      stub.restore();
    });

    it("should return status 200 if the notes are empty", async function () {
      const stub = sinon.stub(noteModel, "find").resolves([]);
      newReq = { user_id: "613ab597cbf2623120614c98" };
      await get_all_notes(newReq, res);
      expect(status.args[0][0]).equal(200);

      stub.restore();
    });
  });

  describe("Delete Notes", function () {
    let status, json, res, send;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      send = sinon.spy();
      res = { json, status, send };
      status.returns(res);
    });
    const stub = sinon.stub(noteModel, "deleteOne").returns([]);

    it("should delete a valid note", async () => {
      const req = {
        user_id: "613ab597cbf2623120614c98",
        params: { id: "614d428ae591a95c0c24dd28" },
      };
      await delete_note(req, res);

      expect(status.args[0][0]).equal(200);
      expect(send.args[0][0]).equal(
        "Successfully deleted note (or note does not exist)"
      );
    });

    it("should not give an error for a invalid note", async () => {
      const req = { user_id: "613ab597cbf2623120614c98", params: { id: "" } };
      await delete_note(req, res);
      expect(status.args[0][0]).equal(500);
      expect(json.args[0][0].message).equal("Note deletion failed");
    });
    stub.restore();
  });

  describe("Update Note", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    const stubValue = [
      {
        id: faker.datatype.uuid(),
        title: faker.random.words(),
        content: faker.random.words(),
        meeting_id: faker.datatype.uuid(),
      },
    ];

    it("Updating Valid Note", async () => {
      const mReq = {
        user_id: "613ab597cbf2623120614c98",
        body: stubValue,
        params: faker.datatype.uuid(),
      };
      const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };

      const stub = sinon.stub(noteModel, "findByIdAndUpdate").resolves([]);
      const stub2 = sinon.stub(noteModel, "findById").resolves([stubValue]);

      const note = update_note(mReq, mReply);
      expect(note.id).equal(stubValue.id);
      expect(note.content).equal(stubValue.content);
      expect(note.title).equal(stubValue.title);
      expect(note.user_id).equal(stubValue.user_id);
      expect(note.meeting_id).equal(stubValue.meeting_id);

      stub.restore();
      stub2.restore();
    });

    it("should not update invalid Note", async () => {
      const mReq = {
        user_id: "613ab597cbf2623120614c98",
        body: stubValue,
        params: faker.datatype.uuid(),
      };
      const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };

      const stub = sinon.stub(noteModel, "findByIdAndUpdate").resolves([]);
      const stub2 = sinon.stub(noteModel, "findById").resolves([]);

      const note = await update_note(mReq, res);
      expect(status.args[0][0]).equal(500);
      expect(json.args[0][0].message).equal("Note update failed");

      stub.restore();
      stub2.restore();
    });
  });

  describe("Get Meeting Note", function () {
    let newReq;
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    it("should return the notes that matches the user id", async function () {
      const stubValue = {
        _id: faker.datatype.uuid(),
        title: faker.random.words(),
        content: faker.random.words(),
        user_id: faker.datatype.uuid(),
        meeting_id: faker.datatype.uuid(),
      };
      const stub = sinon.stub(noteModel, "findOne").resolves(stubValue);
      newReq = { params: { id: "613ab597cbf2623120614c98" } };

      await get_one_note_by_meeting(newReq, res);
      const notes = json.args[0][0];

      expect(notes._id).equal(stubValue._id);
      expect(notes.title).equal(stubValue.title);
      expect(notes.content).equal(stubValue.content);
      expect(notes.user_id).equal(stubValue.user_id);
      expect(notes.meeting_id).equal(stubValue.meeting_id);

      stub.restore();
    });
    it("should return status 200 if the notes are empty", async function () {
      const stub = sinon.stub(noteModel, "findOne").resolves();
      newReq = { params: { id: "613ab597cbf2623120614c98" } };
      await get_one_note_by_meeting(newReq, res);
      expect(json.args[0][0]).equal(null);
      stub.restore();
    });
  });
});