import {
  ClassSerializerInterceptor,
  UseInterceptors,
  Controller,
  Body,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiResponse,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { HeadersBackofficeInterceptor } from '@common/interceptor/headers-interceptors';
import { ClientsDataDto } from '../dtos/clients.dto';
import { ClientsService } from '../services/clients.service';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HeadersBackofficeInterceptor)
@Controller({
  path: 'clients',
  version: '1',
})
@ApiTags('Platform Clients')
@ApiBearerAuth('bearer')
@ApiResponse({ status: 200 })
export class ClientsController {
  constructor(private readonly service: ClientsService) {}

  @ApiOperation({ operationId: 'clientRegister' })
  @ApiOkResponse({
    description: 'Client created successfully',
  })
  @Post()
  async clientRegister(@Body() body: ClientsDataDto): Promise<void> {
    await this.service.clientRegister(body.data);
  }
}
