/**
 * order_controller.test.js, contains unit tests for the Orders Controller
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Charan Singh, Olivia Ryan, Natasha Ireland
 */
import { createRequire } from "module";
import {
  create_order,
  get_all_orders,
  delete_order,
} from "../controllers/orderController.js";
import orderModel from "../models/order.js";
const require = createRequire(import.meta.url);

const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");

describe("Order Controller", function () {
  describe("Create Order", function () {
    let status, json, res;
    beforeEach(() => {
      status = sinon.stub();
      json = sinon.spy();
      res = { json, status };
      status.returns(res);
    });

    const stubValue = [
      {
        order_date: faker.random.words(),
        due_date: faker.random.words(),
        product: faker.random.words(),
        stage: faker.random.words(),
        amount: faker.datatype.number(),
        contact_id: faker.datatype.uuid(),
      }
    ];

    it("Creating Valid Order", async () => {
      const mReq = { user_id: "613ab597cbf2623120614c98", body: stubValue };
      const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
      const order = create_order(mReq, mReply);

      expect(order.order_date).equal(stubValue.order_date);
      expect(order.due_date).equal(stubValue.due_date);
      expect(order.product).equal(stubValue.product);
      expect(order.stage).equal(stubValue.stage);
      expect(order.amount).equal(stubValue.amount);
      expect(order.contact_id).equal(stubValue.contact_id);
    });

    it("should not create an order when user id is empty", async function () {
      const req = { body: stubValue };
      create_order(req, res);
      expect(status.calledOnce).equal(true);
      expect(status.args[0][0]).equal(400);
      expect(json.calledOnce).equal(true);
      expect(json.args[0][0].message).equal("User doesn't exist");
    });
  });

    describe("Get Order", function () {
      let newReq;
      let status, json, res;
      beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        res = { json, status };
        status.returns(res);
      });

      it("should return the order that matches the user id", async function () {
        const stubValue = [
      {
        order_date: faker.random.words(),
        due_date: faker.random.words(),
        product: faker.random.words(),
        stage: faker.random.words(),
        amount: faker.datatype.number(),
        contact_id: faker.datatype.uuid(),
      }
    ];
        const stub = sinon.stub(orderModel, "find").resolves({orders: [stubValue]});
        newReq = { user_id: "613ab597cbf2623120614c98" };

        await get_all_orders(newReq, res);
        const order = json.args[0][0];

        expect(order.order_date).equal(stubValue.order_date);
        expect(order.due_date).equal(stubValue.due_date);
        expect(order.product).equal(stubValue.product);
        expect(order.stage).equal(stubValue.stage);
        expect(order.amount).equal(stubValue.amount);
        expect(order.contact_id).equal(stubValue.contact_id);

        stub.restore();
      });
    });

    describe("Delete Orders", function () {
      let status, json, res, send;
      beforeEach(() => {
        status = sinon.stub();
        json = sinon.spy();
        send = sinon.spy();
        res = { json, status, send };
        status.returns(res);
      });
      const stub = sinon.stub(orderModel, "findByIdAndDelete").resolves();

      it("should delete a valid order", async function() {
        const req = {
          user_id: "613ab597cbf2623120614c98",
          params: { id: "613ab79acbf2623120614ca0" },
        };
        await delete_order(req, res);

        expect(status.args[0][0]).equal(200);
        expect(json.args[0][0]).equal("Order deleted.");
      });
    });
});