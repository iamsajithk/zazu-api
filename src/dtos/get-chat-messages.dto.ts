import { IsOptional } from 'class-validator';

export class GetChatMessagesDto {
  @IsOptional()
  per_page: number;

  @IsOptional()
  page: number;
}
