import { IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class OperatorsDto {
    @ApiProperty({ required: true, name: 'name' })
    @Expose({ name: 'name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    constructor(partial: Partial<OperatorsDto>) {
        Object.assign(this, partial);
    }
}

export class OperatorsDataDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsObject()
    @Type(() => OperatorsDto)
    data: OperatorsDto;

    constructor(partial: Partial<OperatorsDataDto>) {
        Object.assign(this, partial);
    }
}
