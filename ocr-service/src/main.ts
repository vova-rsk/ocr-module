import { NestFactory } from '@nestjs/core';
import { Transport, RmqOptions } from '@nestjs/microservices';
import { env } from 'process';
import { AppModule } from './app.module';
import { enums } from './common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<RmqOptions>(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:${env.RMQ_PORT}`],
      queue: enums.Queues.url,
      noAck: false,
      queueOptions: {
        durable: false,
      },
    },
  });
  await app.listen();
}
bootstrap();
