import { IsDefined, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { IsPhone } from '../../validators/phone.validator';

export class GetAllWhatsappDto {
  @IsPhone()
  @IsDefined()
  phone?: string;

  @Min(0)
  @IsInt()
  @IsDefined()
  @Type(() => Number)
  limit: number;

  @Min(0)
  @IsInt()
  @IsDefined()
  @Type(() => Number)
  page: number;
}
