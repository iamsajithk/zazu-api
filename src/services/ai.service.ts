import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AIService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}
  async createAIRequest(data: Prisma.AIRequestCreateInput) {
    return this.prisma.aIRequest.create({
      data,
    });
  }
  async updateAIRequest(id: number, data: Prisma.AIRequestUpdateInput) {
    return this.prisma.aIRequest.update({
      where: { id: id },
      data,
    });
  }
}
