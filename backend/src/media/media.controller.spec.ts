import { ClientsModule, Transport } from '@nestjs/microservices';
import { Test, TestingModule } from '@nestjs/testing';
import { env } from 'process';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { enums } from '../common';
import { BadRequestException } from '@nestjs/common';

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

describe('send valid url', () => {
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

  it('should return the success sending message', async () => {
    const id = '123xyz';
    const fileUrl = 'https://www.pixabay.com/asdsadds.jpg';
    const result = `File url was successfully send for processing with request id=${id}`;
    const res = {
      statusCode: 200,
      status: 'success',
      message: result,
    };

    jest.spyOn(service, 'sendToQueue').mockImplementation(async () => result);

    expect(await controller.sendLinkToQueue({ fileUrl })).toStrictEqual(res);
  });
});

describe('send invalid url (invalid file type or format)', () => {
  let controller: MediaController;

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
  });

  it('should return the Bad request', async () => {
    const fileUrl = 'https://www.pixabay.com/asdsadds.mp3';

    await expect(controller.sendLinkToQueue({ fileUrl })).rejects.toThrowError(
      BadRequestException,
    );
  });
});
