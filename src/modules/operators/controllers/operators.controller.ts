import {
    ClassSerializerInterceptor,
    UseInterceptors,
    Controller,
    Headers,
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
import { OperatorsService } from '../services/operators.service';
import { HeadersBackofficeInterceptor } from '@common/interceptor/headers-interceptors';
import { User } from '@common/decorators/user.decorator';
import { UserDto } from '@common/dtos/user.dto';
import { HeadersDto } from '@common/dtos/headers.dto';
import { OperatorsDataDto } from '../dtos/operators.dto';

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
    async operatorRegister(
        // @User() user: UserDto,
        // @Headers() headers: HeadersDto,
        @Body() body: OperatorsDataDto,
    ): Promise<void> {
        await this.service.operatorRegister(body.data);
    }
}
