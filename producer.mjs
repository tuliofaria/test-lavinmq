const URL = "amqp://guest:guest@localhost:5672";

import { connect } from "amqp-connection-manager";

const connection = await connect([URL]);

const channelWrapper = connection.createChannel({
    json: true,
    setup: (channel) => {
        return Promise.all([
            channel.assertQueue("test-queue", { durable: true }),
        ]);
    },
});

let i = 0
setInterval(() => {
    channelWrapper.sendToQueue("test-queue", { message: i + " Hello, world!", shouldAck: i%3===0 });
    i++;
}, 1000);
