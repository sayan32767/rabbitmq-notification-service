import express from "express";
import { connectDB } from "./db/mongoDB.js";
import userRoute from "./routes/user.routes.js"

const app = express();
const PORT = 3001;
connectDB();

app.use(express.json());

app.use('/api/v1/user', userRoute);

app.listen(PORT, () => {
    console.log(`User service is running on PORT ${PORT}`);
})
