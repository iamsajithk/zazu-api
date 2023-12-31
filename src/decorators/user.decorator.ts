import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const USER = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user; // extract token from request
  },
);
