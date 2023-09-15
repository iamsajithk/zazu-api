import { Controller, Post, Res } from '@nestjs/common';
import { AIService } from '../services/ai.service';
import { USER } from '../decorators/user.decorator';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { Response } from 'express';

@Controller()
export class AIController {
  constructor(
    private readonly aiService: AIService,
    private configService: ConfigService,
  ) {}

  @Post('/api/ai/ask')
  async askAI(@Res() res: Response, @USER() user: number): Promise<any> {
    const response = {
      status: 'error',
      message: 'Request incomplete.',
      type: 'error',
      response: null,
      requestId: null,
    };

    const messages = [];
    messages.push({ role: 'user', content: '' });
    const model = 'gpt-4';
    const temperature = 1;
    const data = {
      model: model,
      // model: 'gpt-3.5-turbo',
      // model: 'gpt-4',
      messages: messages,
      temperature: temperature,
      max_tokens: 800,
      frequency_penalty: 0,
      presence_penalty: 0,
    };
    const aiRequest = await this.aiService.createAIRequest({
      prompt: JSON.stringify(data),
      user_id: user,
      status: 'PENDING',
    });
    const openaiResponse = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      data,
      {
        headers: {
          Authorization: `Bearer ${this.configService.get('OPENAI_API_KEY')}`,
          'Content-Type': 'application/json',
        },
      },
    );
    if (openaiResponse.status === 200) {
      response.status = 'success';
      response.type = 'success';
      response.message = 'Response attached.';
      response.response = openaiResponse.data;
      const totalCost = this.getAIRequestCost(
        JSON.stringify(openaiResponse.data),
      );
      await this.aiService.updateAIRequest(aiRequest.id, {
        response: JSON.stringify(openaiResponse.data),
        prompt_tokens: openaiResponse.data.usage.prompt_tokens,
        response_tokens: openaiResponse.data.usage.completion_tokens,
        total_tokens: openaiResponse.data.usage.total_tokens,
        total_cost: totalCost,
        updated_at: new Date(),
        status: 'COMPLETED',
      });
    } else {
      await this.aiService.updateAIRequest(aiRequest.id, {
        response: JSON.stringify(openaiResponse.data),
        updated_at: new Date(),
        status: 'ERROR',
      });
      response.message = 'Error while processing request.';
      response.type = 'request_error';
    }
    res.status(200).json(response);
  }
  getAIRequestCost(data): number {
    let totalCost = 0;
    const modelCosts = [
      {
        model: 'gpt-3.5-turbo-0301',
        inputTokenCost: 0.0015,
        outputTokenCost: 0.002,
      },
      {
        model: 'gpt-3.5-turbo-0613',
        inputTokenCost: 0.0015,
        outputTokenCost: 0.002,
      },
      {
        model: 'gpt-4-0314',
        inputTokenCost: 0.03,
        outputTokenCost: 0.06,
      },
      {
        model: 'gpt-4-0613',
        inputTokenCost: 0.03,
        outputTokenCost: 0.06,
      },
      {
        model: 'text-davinci-003',
        inputTokenCost: 0.002,
        outputTokenCost: 0.002,
      },
    ];
    const openAIResponse = JSON.parse(data);
    const { model } = openAIResponse;
    const currentModelCost = modelCosts.find(
      (modelCost) => modelCost.model == model,
    );
    if (currentModelCost) {
      totalCost =
        (openAIResponse.usage.prompt_tokens * currentModelCost.inputTokenCost +
          openAIResponse.usage.completion_tokens *
            currentModelCost.outputTokenCost) /
        1000;
      //Round to 6 decimal places
      totalCost = Math.round(totalCost * 1000000) / 1000000;
    }
    return totalCost;
  }
}
