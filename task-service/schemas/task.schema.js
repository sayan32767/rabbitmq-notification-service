import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    createdBy: {
        type: String,
    },

    title: {
        type: String,
    },

    description: {
        type: String
    },
}, { timestamps: true })

export const Task = mongoose.model("Task", taskSchema);
