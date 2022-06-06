import {
  Body,
  Controller,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LinkDto } from './dto/link.dto';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private mediaService: MediaService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async sendLinkToQueue(@Body() linkDto: LinkDto) {
    const result = await this.mediaService.sendToQueue(linkDto.fileUrl);

    return {
      statusCode: HttpStatus.CREATED,
      status: 'success',
      message: result,
    };
  }
}
