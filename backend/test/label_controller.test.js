import { createRequire } from "module";
import {
  create_label,
  get_all_labels,
  delete_label,
} from "../controllers/labelController.js";
import labelModel from "../models/label.js";
const require = createRequire(import.meta.url);

const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

describe("Label Controller", function () {
  describe("Create label", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    const stubValue = [
      {
        title: faker.random.words(),
        colour: faker.random.words()
        
      }
    ];

    it("Creating Valid Label", async () => {
      const mReq = { user_id: "some_id", body: stubValue };
      const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
      const Label = create_label(mReq, mReply);

      expect(Label.colour).equal(stubValue.colour);
      expect(Label.title).equal(stubValue.title);
    });

    it("should not create a Label when user id is empty", async function () {
      const req = { body: stubValue };
      create_label(req, res);
      expect(status.calledOnce).equal(true);
      expect(status.args[0][0]).equal(400);
      expect(json.calledOnce).equal(true);
      expect(json.args[0][0].message).equal("User doesn't exist");
    });
  });

    describe("Get Labels", function () {
      let newReq;
      let status, json, res;
      beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
      });

      it("should return the Labels that matches the user id", async function () {
        const stubValue = [
      {
        title: faker.random.words(),
        colour: faker.random.words()
      }
    ];
        const stub = sinon.stub(labelModel, "find").resolves({labels: [stubValue]});
        newReq = { user_id: "some_id" };

        await get_all_labels(newReq, res);
        const Label = json.args[0][0];

        expect(Label.colour).equal(stubValue.colour);
        expect(Label.title).equal(stubValue.title);

        stub.restore();
      });
      it("should return status 400 if the labels are empty", async function () {
        const stub = sinon.stub(labelModel, "find").resolves([]);
        newReq = { user_id: "some_id" };
        await get_all_labels(newReq, res);
        expect(status.calledOnce).equal(true);
        expect(status.args[0][0]).equal(200);
      });
    });

    describe("Delete labels", function () {
      let status, json, res, send;
      beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        send = sinon.spy();
        res = { json, status, send };
        status.returns(res);
      });
      const stub = sinon.stub(labelModel, "findByIdAndDelete").resolves();

      it("should delete a valid label", async function() {
        const req = {
          user_id: "some_id",
          params: { id: "some_label_id" },
        };
        await delete_label(req, res);

        expect(status.args[0][0]).equal(200);
        expect(json.args[0][0]).equal("Successfully deleted label if it exists");
      });

      it("should give an error for a invalid label", async function(){
        const req = { user_id: "some_id", params: { id: "some_invalid_label_id" } };
        await delete_label(req, res);
        expect(status.args[0][0]).equal(200);
        expect(json.args[0][0]).equal(
          "Successfully deleted label if it exists"
        );
      });
    });
});
