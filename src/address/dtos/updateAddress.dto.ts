import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateAddressDto {
  @IsString()
  @IsOptional()
  complement: string;

  @IsOptional()
  @IsInt()
  numberAddress: number;
}
