import { ClassSerializerInterceptor, UseInterceptors, Controller, Post, Body, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { HeadersBackofficeInterceptor } from '@common/interceptor/headers-interceptors';
import { ClientsService } from '../services/clients.service';
import { ClientsDataDto } from '../dtos/clients.dto';
import { FastifyRequest } from 'fastify';
import * as fs from 'fs';
import * as path from 'path';

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

    @Post('csv')
    async registerFromCsv(@Req() request: FastifyRequest) {
        const data = await request.file();
        const filePath = path.join('/tmp', data.filename);

        const writeStream = fs.createWriteStream(filePath);
        await new Promise((resolve, reject) => {
            data.file.pipe(writeStream);
            data.file.on('end', resolve);
            data.file.on('error', reject);
        });

        return this.service.registerFromCsv(filePath);
    }

    @ApiOperation({ operationId: 'clientRegister' })
    @ApiOkResponse({
        description: 'Client created successfully',
    })
    @Post()
    async clientRegister(@Body() body: ClientsDataDto): Promise<void> {
        await this.service.clientRegister(body.data);
    }
}
