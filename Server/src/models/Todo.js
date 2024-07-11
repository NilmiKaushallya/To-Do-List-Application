import mongoose, { mongo } from "mongoose";

const todoSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    dueDate: {  // New field for due date
        type: Date,
        required: true,
    },
    isCompleted: {
        type:Boolean,
        default:false,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
});

export default mongoose.model("Todo", todoSchema);