import { IsArray, IsDefined, IsNotEmpty, IsOptional } from 'class-validator';
import { IsPhoneArray } from '../../validators/phone-array.validator';

export class CreateWhatsappDto {
  @IsNotEmpty()
  @IsOptional()
  body?: string;

  @IsPhoneArray()
  @IsDefined()
  to: string[];

  @IsNotEmpty()
  @IsArray()
  @IsOptional()
  mediaUrl?: string[];

  @IsDefined({ message: 'You must provide an body or mediaUrl or both' })
  get isValid() {
    return !this.mediaUrl && !this.body ? undefined : true;
  }
}
