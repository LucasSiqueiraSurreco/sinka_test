import { ClassSerializerInterceptor, UseInterceptors, Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { HeadersBackofficeInterceptor } from '@common/interceptor/headers-interceptors';
import { AssignmentsService } from '../services/assignments.service';
import { AssignmentsDataModel, AssignmentsModel } from '../models/assignments.model';
import { PageDto } from '@common/dtos/page.dto';
import * as path from 'path';
import * as fs from 'fs';
import { FastifyReply } from 'fastify';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HeadersBackofficeInterceptor)
@Controller({
    path: 'assignments',
    version: '1',
})
@ApiTags('Platform Operators')
@ApiBearerAuth('bearer')
@ApiResponse({ status: 200 })
export class AssignmentsController {
    constructor(private readonly service: AssignmentsService) {}

    @ApiOperation({ operationId: 'getAllAssignments' })
    @ApiOkResponse({ type: AssignmentsDataModel })
    @Get()
    async getAllAssignments(): Promise<PageDto<AssignmentsModel>> {
        const data = await this.service.getAllAssignments();
        return new PageDto(data, data.meta);
    }

    @ApiOperation({ operationId: 'exportAssignmentsToCsv' })
    @ApiResponse({ status: 200, description: 'Exportação de dados em CSV bem-sucedida.' })
    @Get('export')
    async exportToCsv(@Res() reply: FastifyReply): Promise<void> {
        const filePath = path.join(__dirname, 'assignments.csv');
        await this.service.exportToCsv(filePath);

        if (fs.existsSync(filePath)) {
            reply.type('text/csv');
            reply.send(fs.createReadStream(filePath));
        } else {
            reply.status(HttpStatus.INTERNAL_SERVER_ERROR).send('Erro ao enviar o arquivo CSV.');
        }
    }
}
