import { Task } from "../schemas/task.schema.js";
import amqp from "amqplib";

let channel, connection;

export const connectRabbitMQWithRetry = async (retries = 5, delay = 3000) => {
    while (retries) {
        try {
            connection = await amqp.connect("amqp://rabbitmq:5672");
            channel = await connection.createChannel();
            await channel.assertQueue("task_created");
            console.log("Connected to RabbitMQ")
            return;
        } catch (error) {
            console.log("RabbitMQ connection error", error.message)
            retries--;
            console.log("Retrying again... ", retries)
            await new Promise(res => setTimeout(res, delay));
        }
    }
}

export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find();

        return res.status(200).json({
            success: true,
            data: tasks
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            data: error.message
        })
    }
}

export const createTask = async (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(403).json({
            success: false,
            data: "Please provide all the fields"
        })
    }

    try {
        const task = await Task.create({ createdBy: 'SOMEFAKEID', title, description })

        const message = { taskId: task._id, userId: 'SOMEFAKEID', title }

        if (!channel) {
            return res.status(503).json({
                error: "RabbitMQ not connected"
            })
        }

        channel.sendToQueue("task_created", Buffer.from(JSON.stringify(message)))

        return res.status(201).json({
            success: true,
            data: task
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            data: error.message
        })
    }
}
