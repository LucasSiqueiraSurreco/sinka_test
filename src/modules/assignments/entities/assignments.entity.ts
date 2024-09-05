import { BaseEntity } from '@common/entities/base.entity';
import { ClientsEntity } from '@modules/clients/entities/clients.entity';
import { OperatorsEntity } from '@modules/operators/entities/operators.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index('operator_id', ['operatorId', 'clientId'], { unique: true })
@Index('client_id', ['clientId'], {})
@Entity('assignments', { schema: 'railway' })
export class AssignmentsEntity extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id',
    length: 36,
    generated: 'uuid',
    default: () => "'uuid()'",
  })
  id: string;

  @Column('int', { name: 'operator_id', nullable: true })
  operatorId: number | null;

  @Column('int', { name: 'client_id', nullable: true })
  clientId: number | null;

  @ManyToOne(() => OperatorsEntity, (operators) => operators.assignments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'operator_id', referencedColumnName: 'id' }])
  operator: OperatorsEntity;

  @ManyToOne(() => ClientsEntity, (clients) => clients.assignments, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'client_id', referencedColumnName: 'id' }])
  client: ClientsEntity;
}
