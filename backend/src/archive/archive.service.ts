import { Injectable } from '@nestjs/common';
import { interfaces } from '../common';

@Injectable()
export class ArchiveService {
  async archivate(messageData: interfaces.IOcrResponse) {
    const { id, fileUrl, status, textData, error } = messageData;

    if (status === 'error') {
      console.log(
        `There was an error processing the image with url ${fileUrl} from request id=${id} `,
      );
      console.log(`Error message: ${error}`);
    } else {
      console.log(
        `Digitalized text from the request id=${id} was successfully received`,
      );
      console.log(`TEXT: ${textData}`);
    }
  }
}
