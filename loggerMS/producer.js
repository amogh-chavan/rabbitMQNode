import amqp from "amqplib";
import { config } from "./config.js";

export class Producer {
  channel;

  async createChannel() {
    const connection = await amqp.connect(config.rabbitMQ.url);
    this.channel = await connection.createChannel();
  }

  async publishMessage(routingKey, message) {
    if (!this.channel) {
      await this.createChannel();
    }

    const exchangeName = config.rabbitMQ.exchangeName;
    await this.channel.assertExchange(exchangeName, "direct");

    const full_message = {
      logType: routingKey,
      message,
      dateTime: new Date(),
    };
    await this.channel.publish(
      exchangeName,
      routingKey,
      Buffer.from(JSON.stringify(full_message))
    );

    console.log(
      `Message ${JSON.stringify(full_message)} send to exchange ${exchangeName}`
    );
  }
}
