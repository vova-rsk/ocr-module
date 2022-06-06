import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import { enums } from 'src/common';

@Injectable()
export class OcrService {
  async getTextFromImage(fileUrl: string, id: string) {
    const worker = createWorker();

    const digitalize = async (imageUrl: string, language: string) => {
      console.log(
        `Start digitalizing image from request id=${id}. Please wait...`,
      );

      await worker.load();
      await worker.loadLanguage(language);
      await worker.initialize(language);

      const { data } = await worker.recognize(imageUrl);

      await worker.terminate();
      return data.text;
    };

    const textData = await digitalize(fileUrl, enums.Languages.en);
    return textData;
  }
}
