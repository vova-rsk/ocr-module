import { IsDefined, IsUrl } from 'class-validator';

export class LinkDto {
  @IsDefined({ message: 'missing fileUrl field' })
  @IsUrl({ message: 'fileUrl value is not an url' })
  readonly fileUrl: string;
}
