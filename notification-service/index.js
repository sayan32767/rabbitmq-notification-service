import amqp from "amqplib";

let connection;
let channel;

const RABBITMQ_URL = "amqp://rabbitmq:5672";
const QUEUE_NAME = "task_created";

export async function startConsumer(retries = 10, delay = 3000) {
    while (retries > 0) {
        try {
            console.log("Connecting to RabbitMQ...");

            connection = await amqp.connect(RABBITMQ_URL);
            channel = await connection.createChannel();

            // Make queue durable so messages don't disappear if RabbitMQ restarts
            await channel.assertQueue(QUEUE_NAME, { durable: true });

            // Avoid flooding this consumer with too many messages
            channel.prefetch(1);

            console.log(`Connected & consuming from queue: ${QUEUE_NAME}`);

            // Start consuming
            channel.consume(QUEUE_NAME, (msg) => {
                if (!msg) return;

                try {
                    const data = JSON.parse(msg.content.toString());

                    console.log("New Task Received:", data.title);

                    // Mark message as processed
                    channel.ack(msg);
                } catch (err) {
                    console.error("Message processing failed:", err);
                    channel.nack(msg, false, false); // discard bad msg
                }
            });

            // If RabbitMQ connection closes then auto reconnect
            connection.on("close", () => {
                console.log("RabbitMQ connection closed. Reconnecting...");
                setTimeout(() => startConsumer(), delay);
            });

            connection.on("error", (err) => {
                console.log("RabbitMQ connection error:", err.message);
            });

            return;
        } catch (err) {
            console.log("Failed to connect:", err.message);
            retries--;
            console.log(`Retrying in ${delay / 1000}s... (${retries} retries left)`);
            await new Promise((res) => setTimeout(res, delay));
        }
    }

    console.error("All retries failed. RabbitMQ unreachable.");
}

startConsumer()
