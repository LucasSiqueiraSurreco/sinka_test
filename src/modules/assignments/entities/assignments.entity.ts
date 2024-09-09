import { BaseEntity } from '@common/entities/base.entity';
import { ClientsEntity } from '@modules/clients/entities/clients.entity';
import { OperatorsEntity } from '@modules/operators/entities/operators.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index('assignments_id_uindex', ['id'], { unique: true })
@Index('assignments_operator_client_uindex', ['operatorId', 'clientId'], {
    unique: true,
})
@Index('assignments_operator_id_idx', ['operatorId'], {})
@Index('assignments_client_id_idx', ['clientId'], {})
@Entity('assignments', { schema: 'railway' })
export class AssignmentsEntity extends BaseEntity {
    @Column('char', {
        primary: true,
        name: 'id',
        length: 36,
        generated: 'uuid',
        default: () => "'uuid()'",
    })
    id: string;

    @Column('varchar', { name: 'operator_id', length: 36 })
    operatorId: string;

    @Column('varchar', { name: 'operator_name', length: 150, nullable: true })
    operatorName: string;

    @Column('varchar', { name: 'client_id', length: 36 })
    clientId: string;

    @Column('varchar', { name: 'client_name', length: 150, nullable: true })
    clientName: string;

    @Column('varchar', { name: 'client_email', length: 255, nullable: true })
    clientEmail: string;

    @ManyToOne(() => ClientsEntity, (clients) => clients.assignments, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
    client: ClientsEntity;

    @ManyToOne(() => OperatorsEntity, (operators) => operators.assignments, {
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION',
    })
    @JoinColumn([{ name: 'operator_id', referencedColumnName: 'id' }])
    operator: OperatorsEntity;
}
