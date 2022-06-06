import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { env } from 'process';
import { OcrController } from './ocr.controller';
import { OcrService } from './ocr.service';
import { enums } from '../common';

describe('OcrController', () => {
  let controller: OcrController;
  let service: OcrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
    }).compile();

    controller = module.get<OcrController>(OcrController);
    service = module.get<OcrService>(OcrService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
