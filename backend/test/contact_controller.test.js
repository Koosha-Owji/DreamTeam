import { createRequire } from "module";
import {
  create_contact,
  get_all_contacts,
  delete_contact,
} from "../controllers/contactController.js";
import contactModel from "../models/contact.js";
const require = createRequire(import.meta.url);

const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

describe("Contact Controller", function () {
  describe("Create Contact", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    const stubValue = [
      {
        first_name: faker.random.words(),
        last_name: faker.random.words(),
        business: faker.random.words(),
        relationship: faker.random.words(),
        email_address: faker.random.words(),
        phone_number: faker.datatype.number(),
        description: faker.random.words(),
        labelID: faker.datatype.uuid(),
      }
    ];

    it("Creating Valid Contact", async () => {
      const mReq = { user_id: "613ab597cbf2623120614c98", body: stubValue };
      const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
      const contact = create_contact(mReq, mReply);

      expect(contact.first_name).equal(stubValue.first_name);
      expect(contact.last_name).equal(stubValue.last_name);
      expect(contact.business).equal(stubValue.business);
      expect(contact.relationship).equal(stubValue.relationship);
      expect(contact.email_address).equal(stubValue.email_address);
      expect(contact.phone_number).equal(stubValue.phone_number);
      expect(contact.description).equal(stubValue.description);
      expect(contact.labelID).equal(stubValue.labelID);
    });

    it("should not create a contact when user id is empty", async function () {
      const req = { body: stubValue };
      create_contact(req, res);
      expect(status.calledOnce).equal(true);
      expect(status.args[0][0]).equal(400);
      expect(json.calledOnce).equal(true);
      expect(json.args[0][0].message).equal("User doesn't exist");
    });
  });

    describe("Get Contacts", function () {
      let newReq;
      let status, json, res;
      beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
      });

      it("should return the contacts that matches the user id", async function () {
        const stubValue = [
      {
        first_name: faker.random.words(),
        last_name: faker.random.words(),
        business: faker.random.words(),
        relationship: faker.random.words(),
        email_address: faker.random.words(),
        phone_number: faker.datatype.number(),
        description: faker.random.words(),
        labelID: faker.datatype.uuid(),
      }
    ];
        const stub = sinon.stub(contactModel, "find").resolves({contacts: [stubValue]});
        newReq = { user_id: "613ab597cbf2623120614c98" };

        await get_all_contacts(newReq, res);
        const contact = json.args[0][0];

         expect(contact.first_name).equal(stubValue.first_name);
         expect(contact.last_name).equal(stubValue.last_name);
         expect(contact.business).equal(stubValue.business);
         expect(contact.relationship).equal(stubValue.relationship);
         expect(contact.email_address).equal(stubValue.email_address);
         expect(contact.phone_number).equal(stubValue.phone_number);
         expect(contact.description).equal(stubValue.description);
         expect(contact.labelID).equal(stubValue.labelID);

        stub.restore();
      });
      it("should return status 400 if the notes are empty", async function () {
        const stub = sinon.stub(contactModel, "find").resolves([]);
        newReq = { user_id: "613ab597cbf2623120614c98" };
        await get_all_contacts(newReq, res);
        expect(status.calledOnce).equal(true);
        expect(status.args[0][0]).equal(200);
      });
    });

    describe("Delete Contacts", function () {
      let status, json, res, send;
      beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        send = sinon.spy();
        res = { json, status, send };
        status.returns(res);
      });
      const stub = sinon.stub(contactModel, "findByIdAndDelete").resolves();

      it("should delete a valid contact", async function() {
        const req = {
          user_id: "613ab597cbf2623120614c98",
          params: { id: "613ab79acbf2623120614ca0" },
        };
        await delete_contact(req, res);

        expect(status.args[0][0]).equal(200);
        expect(json.args[0][0]).equal("Contact deleted.");
      });

      it("should not give an error for a invalid contact", async function(){
        const req = { user_id: "613ab597cbf2623120614c98", params: { id: "" } };
        await delete_contact(req, res);
        expect(status.args[0][0]).equal(200);
        expect(json.args[0][0]).equal(
          "Contact deleted."
        );
      });
    });
});