import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OperatorsItem {
    @ApiProperty({ name: 'name', type: String })
    @Expose({ name: 'name' })
    @Type(() => String)
    name: string;

    @ApiProperty({ name: 'id', type: String })
    @Expose({ name: 'id' })
    @Type(() => String)
    id: string;

    constructor(partial: Partial<OperatorsItem>) {
        Object.assign(this, partial);
    }
}

export class OperatorsItemModel {
    @ApiProperty({ name: 'vouchers', type: OperatorsItem, isArray: true })
    @Type(() => OperatorsItem)
    @Expose({ name: 'vouchers' })
    items: OperatorsItem[];

    @Exclude()
    meta: any;

    constructor(partial: Partial<OperatorsItemModel>) {
        Object.assign(this, partial);
    }
}

export class OperatorsDataModel {
    @ApiProperty({ name: 'data', type: OperatorsItemModel })
    @Type(() => OperatorsItemModel)
    @Expose({ name: 'data' })
    data: OperatorsItemModel;

    meta: any;

    constructor(partial: Partial<OperatorsDataModel>) {
        Object.assign(this, partial);
    }
}
