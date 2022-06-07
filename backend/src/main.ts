import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env } from 'process';
import { Transport } from '@nestjs/microservices';
import { enums } from './common';

const PORT = Number(env.APP_PORT) || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://${env.RMQ_HOST}:${env.RMQ_PORT}`],
      queue: enums.Queues.ocr,
      queueOptions: {
        durable: false,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(PORT, () =>
    console.log(`Server successfully started on port ${PORT}`),
  );
}
bootstrap();
