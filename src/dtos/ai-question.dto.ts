import { IsNotEmpty } from 'class-validator';

export class AIQuestionDto {
  @IsNotEmpty()
  question: string;
}
