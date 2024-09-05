import { Column, Entity, Index, OneToMany } from 'typeorm';
import { AssignmentsEntity } from '@modules/assignments/entities/assignments.entity';
import { BaseEntity } from '@common/entities/base.entity';

@Index('name', ['name'], { unique: true })
@Entity('operators', { schema: 'railway' })
export class OperatorsEntity extends BaseEntity {
  @Column('varchar', {
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
