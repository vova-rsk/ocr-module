import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OcrService } from './ocr/ocr.service';
import { OcrModule } from './ocr/ocr.module';
import { OcrController } from './ocr/ocr.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    OcrModule,
  ],
  controllers: [OcrController],
  providers: [OcrService],
})
export class AppModule {}
