import orderModel from "../models/order.js";
import contactModel from "../models/contact.js";
import userModel from "../models/user.js";
import mongoose from 'mongoose';

export const create_order = async (req, res) =>{
    console.log(req.body, req.user_id);
    const product = req.body.product;
   const stage = req.body.stage;
   const amount = req.body.amount;
   const order_date = req.body.startDate;
   const due_date = req.body.dueDate;
   const user_id=req.user_id;
   const user = await userModel.findOne({ _id: req.user_id});
   if (! user) return res.status(400).json({ message: "User not found" });
   const contact = await contactModel.findOne({_id: req.body.contact_id});
   if (!contact) return res.status(400).json({message: "Contact not found"});
   
   const newOrder =new orderModel({
       product, stage, amount,order_date, due_date, user_id, contact_id: req.body.contact_id
   });
   console.log("made new order", newOrder)
   try {
       await newOrder.save()
       console.log("New order saved", newOrder)
        return res.json({message:"Added new order!", order:newOrder});
        
} catch (err) { 
    console.log("caught", err)
    return res.status(400).json({message: "Error saving new order"}); }
};

// Retrieve all contacts belonging to a single user
export const get_all_orders = async (req, res) => {
    orderModel.find({user_id: req.user_id})
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
};

export const get_order = async(req,res) =>{

    orderModel.findById(req.params.id)
    .then(orders => res.json(orders))
    .catch(err => res.status(400).json('Error: ' + err));
}


export const delete_order = async(req,res)=>{
    orderModel.findByIdAndDelete(req.params.id)
    .then(() => res.json('Order deleted.'))
    .then(console.log('Order deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
}

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


