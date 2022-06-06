import { Injectable } from '@nestjs/common';
import { interfaces } from '../common';

@Injectable()
export class ArchiveService {
  async archivate(messageData: interfaces.IOcrResponse) {
    const { id, textData } = messageData;
    console.log(
      `Digitalized text from the request id=${id} was successfully received`,
    );
    console.log(`TEXT: ${textData}`);
  }
}
