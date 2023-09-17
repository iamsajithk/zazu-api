import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class SaveIncomeDto {
  @IsOptional()
  id: number;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
