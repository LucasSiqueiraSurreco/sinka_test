import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class AssignmentsDto {
    @ApiProperty({ required: true, name: 'operator_id' })
    @Expose({ name: 'operator_id' })
    @IsNotEmpty()
    @IsString()
    operatorId: string;

    @ApiProperty({ required: true, name: 'operator_name' })
    @Expose({ name: 'operator_name' })
    @IsNotEmpty()
    @IsString()
    operatorName: string;

    @ApiProperty({ required: true, name: 'client_id' })
    @Expose({ name: 'client_id' })
    @IsNotEmpty()
    @IsString()
    clientId: string;

    @ApiProperty({ required: true, name: 'client_name' })
    @Expose({ name: 'client_name' })
    @IsNotEmpty()
    @IsString()
    clientName: string;

    @ApiProperty({ required: true, name: 'client_email' })
    @Expose({ name: 'client_email' })
    @IsNotEmpty()
    @IsString()
    clientEmail: string;

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
