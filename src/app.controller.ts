import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('health')
@ApiTags('health')
export class AppController {
  @Get()
  async health(): Promise<{ message: string }> {
    return { message: 'OK' };
  }
}
