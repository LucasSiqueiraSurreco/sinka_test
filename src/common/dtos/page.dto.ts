import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { PageMetaDto } from './page-meta.dto';

export class PageDto<T> {
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T;

  @ApiProperty({ type: () => PageMetaDto })
  @Type(() => PageMetaDto)
  @IsOptional()
  readonly meta: PageMetaDto;

  @IsBoolean()
  readonly status?: boolean;

  @IsNumber()
  readonly status_code?: number;

  constructor(
    data: T,
    meta?: PageMetaDto,
    status?: boolean,
    status_code?: number,
  ) {
    this.data = data;
    this.status = status;
    this.status_code = status_code;
    this.meta = meta;
  }
}
