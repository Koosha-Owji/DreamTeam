import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  first_name: { type: String, required:  true },
  last_name: {type: String, required: true},
  email_address: { type: String, required: true },
  department: {type: String, required: true},
  role: {type: String, required: true},
  password: { type: String, required: true },
});

export default mongoose.model("User", userSchema);