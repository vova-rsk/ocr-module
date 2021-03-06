import { Controller, Inject } from '@nestjs/common';
import {
  MessagePattern,
  ClientProxy,
  Payload,
  Ctx,
  RmqContext,
} from '@nestjs/microservices';
import { enums, interfaces } from '../common';
import { MessageDto } from './dto/messageData.dto';
import { OcrService } from './ocr.service';

@Controller()
export class OcrController {
  constructor(
    @Inject('OCR_SERVICE') private readonly client: ClientProxy,
    private readonly ocrService: OcrService,
  ) {}

  @MessagePattern(enums.RmqEvents.urlTransfer)
  async getUrlForOcr(
    @Payload() messageData: MessageDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    const { id, fileUrl } = messageData;
    const result = await this.ocrService.getTextFromImage(fileUrl, id);

    this.client.emit<string, interfaces.IOcrResponse>(
      enums.RmqEvents.textTransfer,
      {
        id,
        fileUrl,
        ...result,
      },
    );

    console.log(
      `Request id=${id} was successfully processed and the response was sent back to the sender`,
    );

    channel.ack(originalMsg);
  }
}
