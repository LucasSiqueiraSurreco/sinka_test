import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { v4 } from 'uuid';

@Injectable()
export class HeadersBackofficeInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (!req.headers['x-version']) {
      throw new BadRequestException({
        message: ['Version was not provided'],
      });
    }

    if (!req.headers['x-correlation-id']) {
      req.headers['x-correlation-id'] = v4();
    }

    return next.handle();
  }
}
