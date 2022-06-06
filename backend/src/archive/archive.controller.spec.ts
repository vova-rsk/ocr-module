import { Test, TestingModule } from '@nestjs/testing';
import { ArchiveController } from './archive.controller';
import { ArchiveService } from './archive.service';

describe('ArchiveController', () => {
  let controller: ArchiveController;
  let service: ArchiveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArchiveController],
      providers: [ArchiveService],
    }).compile();

    controller = module.get<ArchiveController>(ArchiveController);
    service = module.get<ArchiveService>(ArchiveService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });
});
