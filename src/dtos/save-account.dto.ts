import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SaveAccountDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  account_balance: number;

  @IsNotEmpty()
  @IsNumber()
  minimum_balance: number;
}
