import { Injectable } from '@nestjs/common';
import { createWorker } from 'tesseract.js';
import { enums } from '../common';

@Injectable()
export class OcrService {
  async getTextFromImage(fileUrl: string, id: string) {
    const worker = createWorker();

    const digitalize = async (imageUrl: string, language: string) => {
      console.log(
        `Starting digitalizing image from request id=${id}. Please wait...`,
      );

      await worker.load();
      await worker.loadLanguage(language);
      await worker.initialize(language);

      const { data } = await worker.recognize(imageUrl);

      await worker.terminate();
      return { status: 'success', textData: data.text };
    };

    try {
      const textData = await digitalize(fileUrl, enums.Languages.en);
      return textData;
    } catch (error) {
      console.log(
        `There was an error processing the image from request id=${id}`,
      );

      return { status: 'error', error: (<Error>error).message };
    }
  }
}
