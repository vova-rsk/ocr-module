import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { enums, interfaces } from 'src/common';
import isImageCheck from 'src/helpers';

@Injectable()
export class MediaService {
  constructor(@Inject('OCR_SERVICE') private readonly client: ClientProxy) {}

  async sendToQueue(fileUrl: string) {
    const isImage = isImageCheck(fileUrl);

    if (!isImage) {
      throw new BadRequestException('Is not valid file type or format');
    }

    const id = uuidv4();

    this.client.emit<string, interfaces.IMessageData>(
      enums.RmqEvents.urlTransfer,
      {
        id,
        fileUrl,
      },
    );
    console.log(`Request id=${id} for ocr has successfully sent`);

    return `File url was successfully send for processing with request id=${id}`;
  }
}
