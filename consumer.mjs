const URL = "amqp://guest:guest@localhost:5672";

import { connect } from "amqp-connection-manager";

const connection = await connect([URL]);



const channelWrapper = connection.createChannel({
    json: true,
    setup: (channel) => {
        return Promise.all([
            channel.assertQueue("test-queue", { durable: true }),
            channel.consume("test-queue", (message) => {qual 
                console.log(message.content.toString());
                if(!message.ack) {
                    channel.nack(message);
                } else {
                    channel.ack(message);
                }
            }),
        ]);
    },
});

