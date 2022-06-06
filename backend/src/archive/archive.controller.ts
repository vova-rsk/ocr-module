import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { enums } from 'src/common';
import { IOcrResponse } from 'src/common/interfaces';
import { ArchiveService } from './archive.service';

@Controller()
export class ArchiveController {
  constructor(private archiveService: ArchiveService) {}

  @MessagePattern(enums.RmqEvents.textTransfer)
  async getOcrTextData(messageData: IOcrResponse) {
    await this.archiveService.archivate(messageData);
  }
}
