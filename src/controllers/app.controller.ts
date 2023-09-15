import { Controller, Get } from '@nestjs/common';
import { AIService } from '../services/ai.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(
    private readonly aiService: AIService,
    private configService: ConfigService,
  ) {}

  @Get()
  getHome(): string {
    return 'Zazu API';
  }
}
