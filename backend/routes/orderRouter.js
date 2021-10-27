/**
 * orderRouter.js, backend URL routing for order functions
 * Created for IT Project COMP30022, Semester 2 2021
 * The University of Melbourne
 * Implemented by DreamTeam: Anagha Giri, Koosha Owji, Chirag Singh, Olivia Ryan, Natasha Ireland
 */

import express from "express";

import Order from '../models/order.js'
import auth  from '../middleware/auth.js'

// add our router const user
const orderRouter = express.Router();

import { get_all_orders, get_order, create_order, delete_order, update_order} 
from "../controllers/orderController.js";

orderRouter.get('/',auth, get_all_orders);

orderRouter.get('/:id',auth, get_order);

orderRouter.post('/',auth, create_order);

orderRouter.post('/delete/:id',auth, delete_order);

orderRouter.patch('/update/:id',auth, update_order);

// export the router
export default orderRouter;
