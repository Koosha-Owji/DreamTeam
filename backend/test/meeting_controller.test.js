import { createRequire } from "module";
import {
  create_meeting,
  delete_meeting,
  get_all_meetings,

  add_attendee,
  remove_attendee,
  update_meeting,
  mark_as_completed
} from "../controllers/meeting.js";
import meetingModel from "../models/meeting.js";

const require = createRequire(import.meta.url);

const chai = require("chai");
const expect = chai.expect;
const faker = require("faker");
const sinon = require("sinon");


describe( "Meeting Controller", function() {

    describe( "Create Meeting", function() {
        let status, json, res;
        beforeEach(() => {
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });

        


        it( "Create Valid Meeting Without Attendees", async () => {
            const stubValue = [
                {
                    id: faker.datatype.uuid(),
                    //date_time: faker.providers.date_time(),
                    agenda: faker.random.words(),
                    title: faker.random.words(),
                    date: faker.random.words(),
                    time: faker.random.words(),
                    endtime: faker.random.words(),
                },
            ];
            const mReq = { user_id: faker.datatype.uuid(), body: stubValue };
            const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
            const meeting = create_meeting(mReq, mReply);
            const stub = sinon.stub(meetingModel, "findOne").resolves(true);

            expect(meeting.id).equal(stubValue.id);
            expect(meeting.agenda).equal(stubValue.agenda);
            expect(meeting.title).equal(stubValue.title);
            expect(meeting.user_id).equal(stubValue.user_id);
            //expect(meeting.date_time).equal(stubValue.date_time);
            expect(meeting.date).equal(stubValue.date);
            expect(meeting.time).equal(stubValue.time);
            expect(meeting.endtime).equal(stubValue.endtime);

            stub.restore();
        })

        it( "Create Valid Meeting With Attendees", async () => {
            const stubValue = [
                {
                    id: faker.datatype.uuid(),
                    //date_time: faker.providers.date_time(),
                    agenda: faker.random.words(),
                    title: faker.random.words(),
                    date: faker.random.words(),
                    time: faker.random.words(),
                    endtime: faker.random.words(),

                    non_contact_attendees: faker.random.words(),
                    contact_name_id: faker.datatype.uuid(),
                    contact_name: faker.random.words()
                },
            ];
            const mReq = { user_id: faker.datatype.uuid(), body: stubValue };
            const mReply = { code: sinon.stub().returnsThis(), send: sinon.stub() };
            const meeting = create_meeting(mReq, mReply);
            const stub = sinon.stub(meetingModel, "findOne").resolves(true);

            expect(meeting.id).equal(stubValue.id);
            expect(meeting.agenda).equal(stubValue.agenda);
            expect(meeting.title).equal(stubValue.title);
            expect(meeting.user_id).equal(stubValue.user_id);
            //expect(meeting.date_time).equal(stubValue.date_time);
            expect(meeting.date).equal(stubValue.date);
            expect(meeting.time).equal(stubValue.time);
            expect(meeting.endtime).equal(stubValue.endtime);
            
            expect(meeting.non_contact_attendees).equal(stubValue.non_contact_attendees);
            expect(meeting.contact_name_id).equal(stubValue.contact_name_id);
            expect(meeting.contact_name).equal(stubValue.contact_name);

            stub.restore();
        })
    })

    describe( "Delete Meeting", function () {
        let status, json, res, send;
        beforeEach(() => {
            status = sinon.stub();
            json = sinon.spy();
            send = sinon.spy();
            res = { json, status, send };
            status.returns(res);
        });

        var stub = sinon.stub(meetingModel, "deleteOne").returns([]);

        it( "Delete a valid meeting", async () => {
            const req = {
                user_id: "6138417c3c1d6df851c7099c",
                params: { id: "614a9b278de39946c435029d" },
            };
            await delete_meeting(req, res);
            expect(status.args[0][0]).equal(200);
            expect(send.args[0][0]).equal(
                "Successfully deleted meeting (or meeting does not exist or user is not authorised)"
            );
        })
        meetingModel.deleteOne.restore()
        stub = sinon.stub(meetingModel, "deleteOne").throws(new Error("mongo error"));

        it( "Fail to delete a meeting", async () => {
            const req = {
                user_id: "6138417c3c1d6df851c7099c"
            };
            await delete_meeting(req, res);
            expect(status.args[0][0]).equal(500);
            expect(json.args[0][0].message).equal("Meeting deletion failed");
        })
        stub.restore();
        
    }) 

    describe( "Get all meetings", function () {
        let newReq;
        let status, json, res;
        beforeEach(() => {
            status = sinon.stub();
            json = sinon.spy();
            res = { json, status };
            status.returns(res);
        });

        it("should return the meetings that match the user id", async function () {
            const stubValue = [
                {
                    //id: faker.datatype.uuid(),
                    //date_time: faker.providers.date_time(),
                    agenda: faker.random.words(),
                    title: faker.random.words(),
                    date: faker.random.words(),
                    time: faker.random.words(),
                    endtime: faker.random.words(),

                    non_contact_attendees: faker.random.words(),
                    contact_name_id: faker.datatype.uuid(),
                    contact_name: faker.random.words()
                },
            ];
            //const stub = sinon.stub(meetingModel, "find").resolves(stubValue);
            const stub = sinon.stub(meetingModel, "find").returns(stubValue);
            const req = { user_id: faker.datatype.uuid() };
    
            // const meetings = await get_all_meetings(req, res);
            //const meeting = meetings[0];
            await get_all_meetings(req, res);
            const meeting = res.json[0];
    
            expect(meeting.title).equal(stubValue[0].title);
            expect(meeting._id).equal(stubValue[0]._id);
            expect(meeting.agenda).equal(stubValue[0].agenda);
            expect(meeting.user_id).equal(stubValue[0].user_id);
            expect(meeting.date).equal(stubValue[0].date);
            expect(meeting.time).equal(stubValue[0].time);
            expect(meeting.endtime).equal(stubValue[0].endtime);
            expect(meeting.non_contact_attendees).equal(stubValue[0].non_contact_attendees);
            expect(meeting.contact_name_id).equal(stubValue[0].contact_name_id);
            expect(meeting.contact_name).equal(stubValue[0].contact_name);
            expect(status.args[0][0]).equal(200);
    
            stub.restore();
        });
    })
})