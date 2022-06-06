import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, ClientProxy } from '@nestjs/microservices';
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
  async getUrlForOcr(messageData: MessageDto) {
    const { id, fileUrl } = messageData;
    const textData = await this.ocrService.getTextFromImage(fileUrl, id);

    this.client.emit<string, interfaces.IOcrResponse>(
      enums.RmqEvents.textTransfer,
      { id, textData },
    );

    console.log(
      `Request id=${id} was successfully processed and the response was sent back to the sender`,
    );
  }
}
