import { Exclude, Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class AssignmentsItem {
    @ApiProperty({ name: 'operator_id', type: String })
    @Expose({ name: 'operator_id' })
    @Type(() => String)
    operatorId: string;

    @ApiProperty({ name: 'operator_name', type: String })
    @Expose({ name: 'operator_name' })
    @Type(() => String)
    operatorName: string;

    @ApiProperty({ name: 'client_id', type: String })
    @Expose({ name: 'client_id' })
    @Type(() => String)
    clientId: string;

    @ApiProperty({ name: 'client_name', type: String })
    @Expose({ name: 'client_name' })
    @Type(() => String)
    clientName: string;

    @ApiProperty({ name: 'client_email', type: String })
    @Expose({ name: 'client_email' })
    @Type(() => String)
    clientEmail: string;

    constructor(partial: Partial<AssignmentsItem>) {
        Object.assign(this, partial);
    }
}

export class AssignmentsModel {
    @ApiProperty({ name: 'assignments', type: AssignmentsItem, isArray: true })
    @Type(() => AssignmentsItem)
    @Expose({ name: 'assignments' })
    items: AssignmentsItem[];

    @Exclude()
    meta: any;

    constructor(partial: Partial<AssignmentsModel>) {
        Object.assign(this, partial);
    }
}

export class AssignmentsDataModel {
    @ApiProperty({ name: 'data', type: AssignmentsModel })
    @Type(() => AssignmentsModel)
    @Expose({ name: 'data' })
    data: AssignmentsModel;

    meta: any;

    constructor(partial: Partial<AssignmentsDataModel>) {
        Object.assign(this, partial);
    }
}
