/**
 * orderController.js, controller functions for order (get, get all, update, delete, create)
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import orderModel from "../models/order.js";
import contactModel from "../models/contact.js";
import userModel from "../models/user.js";
import mongoose from 'mongoose';

 /**
  * Create new order
  * @param {order product} product
  * @param {order stage} stage
  * @param {order amount} amount
  * @param {order order_date} order_date
  * @param {contact due_date} due_date
  * @returns {status message} 
  */

export const create_order = async (req, res) =>{
   
    const product = req.body.product;
   const stage = req.body.stage;
   const amount = req.body.amount;
   const order_date = req.body.startDate;
   const due_date = req.body.dueDate;
   const user_id=req.user_id;
   const contact_id=req.body.contact_id;
   const user = await userModel.findOne({ _id: req.user_id});
   if (! user) return res.status(400).json({ message: "User not found" });
   
   const newOrder =new orderModel({
       product, stage, amount,order_date, due_date, user_id, contact_id
   });
   try {
       await newOrder.save()
        return res.send(newOrder);
        
} catch (err) { 
    console.log("caught", err)
    return res.status(400).json({message: "Error saving new order"}); }
};

/**
  * Get all orders of logged in user
  * @param {logged in user's id} user_id
  * @returns {all orders}  
  */
export const get_all_orders = async (req, res) => {
    orderModel.find({user_id: req.user_id})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
};

 /**
  * Get one existing order
  * @param {id of order to be retruned} id
  * @returns {order} 
  */

export const get_order = async(req,res) =>{

    orderModel.findById(req.params.id)
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
}

/**
  * Delete order by input id
  * @param {id of order to be deleted} id
  * @returns {status message} 
  */

export const delete_order = async(req,res)=>{
    orderModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Order deleted.'))
    .then(console.log('Order deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
}

 /**
  * Update existing order details
  * @param {order product} product
  * @param {order stage} stage
  * @param {order amount} amount
  * @param {order order_date} order_date
  * @param {contact due_date} due_date
  * @returns {status message} 
  */

export const update_order = async(req, res)=>{

    orderModel.findById(req.params.id)
    .then(orders =>{
        orders.order_date = req.body.order_date;
        orders.due_date = req.body.due_date;
        orders.product = req.body.product;
        orders.stage =req.body.stage;
        orders.amount = req.body.amount;
        
        orders.save()
        .then(() => res.json(orders))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err=>res.status(400).json('Error: ' +err));
}


