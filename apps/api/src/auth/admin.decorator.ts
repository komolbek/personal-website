import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { AdminPayload } from './auth.service.js';

export const CurrentAdmin = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): AdminPayload => {
    const request = ctx.switchToHttp().getRequest();
    return request.admin;
  },
);
