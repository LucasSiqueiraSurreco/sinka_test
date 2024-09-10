import { ClassSerializerInterceptor, UseInterceptors, Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { HeadersBackofficeInterceptor } from '@common/interceptor/headers-interceptors';
import { AssignmentsService } from '../services/assignments.service';
import { AssignmentsDataModel, AssignmentsModel } from '../models/assignments.model';
import { PageDto } from '@common/dtos/page.dto';

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
}
