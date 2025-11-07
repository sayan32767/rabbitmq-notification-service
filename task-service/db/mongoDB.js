import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://mongo:27017/tasks");
        console.log("MongoDB Connected Successfully!")
    } catch (error) {
        console.log("Error Connecting to DB!");
    }
}

// export const connectDB = async () => {
//     try {
//         await mongoose.connect("mongodb://127.0.0.1:27018/tasks");
//         console.log("MongoDB Connected Successfully!")
//     } catch (error) {
//         console.log("Error Connecting to DB!");
//     }
// }
