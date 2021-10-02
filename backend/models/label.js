import mongoose from "mongoose";


const colours = [
    "#e57373", //red
    "#b39ddb", //purple
    "#fff176", //yellow
    "#ff8a65", //orange
    "#81c784", //green
    "#90caf9" //blue
]

const labelSchema = mongoose.Schema({
    colour: {type: String, enum: ["#e57373", "#b39ddb", "#fff176", "#ff8a65", "#81c784", "#90caf9"], required: true},
    title: {type: String, required: true},
    user_id: {type: String, required: false}
});

export default mongoose.model("Label", labelSchema);