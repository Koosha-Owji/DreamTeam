import { createRequire } from "module";
import {
  create_note,
  delete_note,
  get_all_notes,
} from "../controllers/noteController.js";
import noteModel from "../models/note.js";
const require = createRequire(import.meta.url);

const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

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
      newReq = { user_id: "613ab597cbf2623120614c98" };

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

     it("should return status 400 if the notes are empty", async function () {
       const stub = sinon.stub(noteModel, "find").resolves([]);
       newReq = { user_id: "613ab597cbf2623120614c98" };
       await get_all_notes(newReq, res);
       expect(status.args[0][0]).equal(400);
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
      expect(status.args[0][0]).equal(200);
      expect(send.args[0][0]).equal(
        "Successfully deleted note (or note does not exist)"
      );
    });
  });
});
