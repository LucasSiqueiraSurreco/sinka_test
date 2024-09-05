import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class PageMetaDto {
  /* @ApiProperty()
    readonly page: number;

    @ApiProperty()
    readonly limit: number;

    @ApiProperty()
    readonly itemCount: number;

    @ApiProperty()
    readonly pageCount: number;

    @ApiProperty()
    readonly hasPreviousPage: boolean;

    @ApiProperty()
    readonly hasNextPage: boolean;

    constructor({ pageOptionsDto, itemCount }: PageMetaDtoParameters) {
        this.page = pageOptionsDto.page;
        this.limit = pageOptionsDto.limit;
        this.itemCount = itemCount;
        this.pageCount = Math.ceil(this.itemCount / this.limit);
        this.hasPreviousPage = this.page > 1;
        this.hasNextPage = this.page < this.pageCount;
    }*/

  @ApiProperty()
  @Expose({ name: 'total_items' })
  readonly totalItems: number;

  @ApiProperty()
  @Expose({ name: 'item_count' })
  readonly itemCount: number;

  @ApiProperty()
  @Expose({ name: 'items_per_page' })
  readonly itemsPerPage: number;

  @ApiProperty()
  @Expose({ name: 'total_pages' })
  readonly totalPages: number;

  @ApiProperty()
  @Expose({ name: 'current_page' })
  readonly currentPage: number;

  constructor(partial: Partial<PageMetaDto>) {
    Object.assign(this, partial);
  }
}
