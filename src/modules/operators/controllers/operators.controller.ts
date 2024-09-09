import { ClassSerializerInterceptor, UseInterceptors, Controller, Body, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { OperatorsService } from '../services/operators.service';
import { HeadersBackofficeInterceptor } from '@common/interceptor/headers-interceptors';
import { OperatorsDataDto, OperatorsDto } from '../dtos/operators.dto';

@UseInterceptors(ClassSerializerInterceptor)
@UseInterceptors(HeadersBackofficeInterceptor)
@Controller({
    path: 'operators',
    version: '1',
})
@ApiTags('Platform Operators')
@ApiBearerAuth('bearer')
@ApiResponse({ status: 200 })
export class OperatorsController {
    constructor(private readonly service: OperatorsService) {}

    @ApiOperation({ operationId: 'operatorRegister' })
    @ApiOkResponse({
        description: 'Operator created successfully',
    })
    @Post()
    async operatorRegister(@Body() body: OperatorsDataDto): Promise<void> {
        await this.service.operatorRegister(body.data);
    }

    @Post('mass-register')
    @ApiOperation({ operationId: 'registerMassOperators' })
    @ApiOkResponse({
        description: 'Multiple operators registered successfully',
    })
    async operatorsMassRegister(@Body() body: { data: OperatorsDto[] }) {
        return this.service.operatorsMassRegister(body.data);
    }
}
