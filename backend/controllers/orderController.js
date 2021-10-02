import orderModel from "../models/order.js";
import contactModel from "../models/contact.js";
import userModel from "../models/user.js";
import mongoose from 'mongoose';

export const create_order = async (req, res) =>{

    const product = req.body.product;
   const stage = req.body.stage;
   const amount = req.body.amount;
   const order_date = req.body.order_date,
   const due_date = req.body.due_date,
   const user = await userModel.findOne({ _id: req.user_id});
   if (! user) return res.status(400).json({ message: "User not found" });
   const contact = await contactModel.findOne({_id: req.contact_id});
   if (!contact) return res.status(400).json({message: "Contact not found"});
   
   const newOrder =new Order({
       product, stage, amount, user_id: req.user_id, contact_id: req.contact_id
   });

   newOrder.save()
   .then(() => res.json("Added new order!"))
   .catch((err) => res.status(400).json(err));
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
        orders.order_date = req.body.order;
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


