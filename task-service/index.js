import express from "express";
import { connectDB } from "./db/mongoDB.js";
import taskRoute from "./routes/task.route.js"
import { connectRabbitMQWithRetry } from "./controllers/task.controller.js";

const app = express();
const PORT = 3002;

app.use(express.json());
app.use('/api/v1/task', taskRoute);

connectDB();

app.listen(PORT, () => {
    console.log(`Task service is running on PORT: ${PORT}`);
    connectRabbitMQWithRetry();
})
