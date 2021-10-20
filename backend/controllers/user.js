import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";

import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export const signin = async (req, res) => {
  const { email_address, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email_address });

    if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email_address: oldUser.email, id: oldUser._id }, secret, { expiresIn: "4h" });

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const {first_name, last_name, email_address,department,role, password } = req.body;

  try {
    const oldUser = await UserModel.findOne({ email_address });

    if (oldUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModel.create({first_name,last_name, email_address,department,role, password: hashedPassword });

    const token = jwt.sign( { email_address: result.email, id: result._id }, secret, { expiresIn: "4h" } );

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    
    console.log(error);
  }
};
export const update = async (req,res)=>{
    try {
      const token = req.headers.authorization.split(" ")[1];
      const oldUser = await UserModel.findOne({ _id: req.user_id});
      if (!oldUser)
      return res.status(400).json({ message: "User doesn't exist" });

      await UserModel
      .findByIdAndUpdate(req.user_id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email_address: req.body.email_address,
        department: req.body.department,
        role: req.body.role
      })
      .exec();
      const result = await UserModel.findOne({ _id: req.user_id});

      return res.json({result,token});      
    } catch (error) {
      res.status(500).json({ message: "User update failed" });
    }
};
export const update_password = async (req,res)=>{
  try {
    const oldUser = await UserModel.findOne({ _id: req.user_id });
    if (!oldUser)
    return res.status(400).json({ message: "User doesn't exist" });
    const isPasswordCorrect = await bcrypt.compare(req.body.current_password, oldUser.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });
    const hashedPassword = await bcrypt.hash(req.body.new_password, 12);

    await UserModel
    .findByIdAndUpdate(req.user_id, {
      password: hashedPassword
    })
    .exec();

    return res.json({message: "Password Changed Successfully!"});      
  } catch (error) {
    res.status(500).json({ message: "Password did not change!" });
  }
};