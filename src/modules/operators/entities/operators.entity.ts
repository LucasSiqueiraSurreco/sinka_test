import { BaseEntity } from '@common/entities/base.entity';
import { AssignmentsEntity } from '@modules/assignments/entities/assignments.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Index('name', ['name'], { unique: true })
@Index('operators_id_uindex', ['id'], { unique: true })
@Entity('operators', { schema: 'railway' })
export class OperatorsEntity extends BaseEntity {
  @Column('char', {
    primary: true,
    name: 'id',
    length: 36,
    generated: 'uuid',
    default: () => "'uuid()'",
  })
  id: string;

  @Column('varchar', { name: 'name', unique: true, length: 255 })
  name: string;

  @OneToMany(() => AssignmentsEntity, (assignments) => assignments.operator)
  assignments: AssignmentsEntity[];
}
