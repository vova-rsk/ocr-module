import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { env } from 'process';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { enums } from '../common';

describe('MediaController', () => {
  let controller: MediaController;
  let service: MediaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'OCR_SERVICE',
            transport: Transport.RMQ,
            options: {
              urls: [`amqp://rabbitmq:${env.RMQ_PORT}`],
              queue: enums.Queues.url,
              queueOptions: {
                durable: false,
              },
            },
          },
        ]),
      ],
      controllers: [MediaController],
      providers: [MediaService],
    }).compile();

    controller = module.get<MediaController>(MediaController);
    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
