import { IsNotEmpty, IsString, IsDateString, IsEmail, IsNumber, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

export class ClientsDto {
    @ApiProperty({ required: true, name: 'name' })
    @Expose({ name: 'name' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({
        required: false,
        name: 'birth',
        type: String,
    })
    @Expose({ name: 'birth' })
    @IsNotEmpty()
    @IsDateString()
    birth: string | null;

    @ApiProperty({ required: false, name: 'email', type: String })
    @Expose({ name: 'email' })
    @IsNotEmpty()
    @IsEmail()
    email: string | null;

    @ApiProperty({ required: false, name: 'value', type: Number })
    @Expose({ name: 'value' })
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    value: number;

    constructor(partial: Partial<ClientsDto>) {
        Object.assign(this, partial);
    }
}

export class ClientsDataDto {
    @ApiProperty()
    @IsNotEmpty()
    @Type(() => ClientsDto)
    data: ClientsDto;

    constructor(partial: Partial<ClientsDataDto>) {
        Object.assign(this, partial);
    }
}
