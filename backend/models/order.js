/**
 * order.js, mongoose schema for order stored in CRM
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import mongoose from "mongoose";

const orderSchema = mongoose.Schema({
    order_date:{type: Date, required: false},
    due_date:{type: Date, required: false},
    product:{type: String, required: false},
    stage:{type: String, enum: ['Ordered', 'Delivered', 'Completed'], required: true},
    amount:{type: Number, required: false},
    user_id: {type: String, required: true}, // identifies the user to which the order belongs
    contact_id: {type: String, required: true}, // identifies which contact has placed the order
})

export default mongoose.model("Order", orderSchema, "order");
