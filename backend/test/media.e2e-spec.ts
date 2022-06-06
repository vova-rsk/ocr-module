import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { env } from 'process';
import * as request from 'supertest';
import { MediaModule } from '../src/media/media.module';
import { MediaService } from '../src/media/media.service';
import { enums } from '../src/common';
import { NotFoundError } from 'rxjs';

describe('MediaController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
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
        MediaModule,
      ],
      providers: [MediaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/media (GET)', () => {
    return request(app.getHttpServer()).get('/media').expect(404);
  });

  it('/media (DEL)', () => {
    return request(app.getHttpServer()).delete('/media').expect(404);
  });

  it('/media (PATCH)', () => {
    return request(app.getHttpServer()).patch('/media').expect(404);
  });

  it('/media (PUT)', () => {
    return request(app.getHttpServer()).put('/media').expect(404);
  });

  it('/media (POST)', () => {
    return request(app.getHttpServer())
      .post('/media')
      .send({ fileUrl: 'https://www.pixabay.com/qweqwe.jpg' })
      .expect(201);
  });

  afterAll(async () => {
    await app.close();
  });
});
