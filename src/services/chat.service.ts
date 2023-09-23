import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from './prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ChatService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}
  async getChatMessages(
    where: Prisma.ChatMessageWhereInput,
    perPage: number,
    page: number,
  ) {
    return this.prisma.chatMessage.findMany({
      where: where,
      orderBy: {
        created_at: 'desc',
      },
      take: perPage,
      skip: perPage * (page - 1),
    });
  }
  async createChatMessage(data: Prisma.ChatMessageCreateInput) {
    return this.prisma.chatMessage.create({
      data,
    });
  }
}
