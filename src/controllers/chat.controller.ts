import { Body, Controller, Post, Res } from '@nestjs/common';
import { USER } from '../decorators/user.decorator';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { AuthService } from 'src/services/auth.service';
import { ChatService } from 'src/services/chat.service';
import { GetChatMessagesDto } from 'src/dtos/get-chat-messages.dto';

@Controller()
export class ChatController {
  constructor(
    private readonly authService: AuthService,
    private readonly chatService: ChatService,
    private configService: ConfigService,
  ) {}
  @Post('/api/chat/messages')
  async getChatMessages(
    @Res() res: Response,
    @USER() user: number,
    @Body() params: GetChatMessagesDto,
  ): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      messages: [],
    };
    const userDetails = this.authService.getUser({ id: user });
    if (userDetails) {
      const perPage = params.per_page ? params.per_page : 10;
      const page = params.page ? params.page : 1;
      const messages = await this.chatService.getChatMessages(
        {
          user_id: user,
        },
        perPage,
        page,
      );
      response.status = 'success';
      response.message = 'Messages retrieved.';
      response.messages = messages;
    } else {
      response.message = 'User not found.';
    }
    res.status(200).json(response);
  }
}
