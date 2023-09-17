import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteIncomeDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
