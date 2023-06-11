import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class CreateWhatsappDto {
  @IsNotEmpty()
  body: string;

  @IsPhoneNumber()
  to: string;
}
