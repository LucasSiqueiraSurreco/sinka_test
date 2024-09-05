import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AssignmentsDto {
    @ApiProperty({ required: true, name: 'operator_id' })
    @Expose({ name: 'operator_id' })
    @IsNotEmpty()
    @IsString()
    operatorId: string;

    @ApiProperty({ required: true, name: 'client_id' })
    @Expose({ name: 'client_id' })
    @IsNotEmpty()
    @IsString()
    clientId: string;

    constructor(partial: Partial<AssignmentsDto>) {
        Object.assign(this, partial);
    }
}

export class AssignmentsDataDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => AssignmentsDto)
    data: AssignmentsDto;

    constructor(partial: Partial<AssignmentsDataDto>) {
        Object.assign(this, partial);
    }
}
