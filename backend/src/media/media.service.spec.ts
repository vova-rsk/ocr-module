import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { env } from 'process';
import { enums } from '../common';
import { MediaService } from './media.service';

describe('MediaService', () => {
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
      providers: [MediaService],
    }).compile();

    service = module.get<MediaService>(MediaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
