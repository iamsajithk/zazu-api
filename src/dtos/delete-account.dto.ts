import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteAccountDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
