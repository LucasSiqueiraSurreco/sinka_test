import {
    ClassSerializerInterceptor,
    UseInterceptors,
    Controller,
    Body,
    Post,
    Delete,
    Param,
    Get,
    Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiResponse, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { OperatorsService } from '../services/operators.service';
import { HeadersBackofficeInterceptor } from '@common/interceptor/headers-interceptors';
import { OperatorsDataDto, OperatorsDto } from '../dtos/operators.dto';
import { OperatorsItemModel } from '../models/operators.model';

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

    @ApiOperation({ operationId: 'findAllOperators' })
    @ApiOkResponse({
        description: 'List of all operators',
    })
    @Get()
    async findAllOperators(): Promise<OperatorsItemModel> {
        return await this.service.findAllOperators();
    }

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

    @ApiOperation({ operationId: 'updateOperatorById' })
    @ApiOkResponse({
        description: 'Operator updated successfully',
    })
    @Put(':id')
    async updateOperatorById(@Param('id') id: string, @Body() body: OperatorsDataDto) {
        return await this.service.updateOperatorById(id, body);
    }

    @ApiOperation({ operationId: 'deleteOperatorById' })
    @ApiOkResponse({
        description: 'Operator deleted successfully',
    })
    @Delete(':id')
    async deleteOperatorById(@Param('id') id: string): Promise<void> {
        await this.service.deleteOperatorById(id);
    }
}
