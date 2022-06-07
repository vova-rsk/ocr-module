import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from 'process';
import { enums } from '../common';
import { OcrController } from './ocr.controller';
import { OcrService } from './ocr.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'OCR_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [`amqp://rabbitmq:${env.RMQ_PORT}`],
          queue: enums.Queues.ocr,
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [OcrController],
  providers: [OcrService],
  exports: [ClientsModule],
})
export class OcrModule {}
