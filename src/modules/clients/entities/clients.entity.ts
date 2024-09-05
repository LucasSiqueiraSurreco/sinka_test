import { BaseEntity } from '@common/entities/base.entity';
import { AssignmentsEntity } from '@modules/assignments/entities/assignments.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Index('email', ['email'], { unique: true })
@Entity('clients', { schema: 'railway' })
export class ClientsEntity extends BaseEntity {
  @Column('varchar', {
    primary: true,
    name: 'id',
    length: 36,
    generated: 'uuid',
    default: () => "'uuid()'",
  })
  id: string;

  @Column('varchar', { name: 'name', length: 255 })
  name: string;

  @Column('date', { name: 'birth', nullable: true })
  birth: string | null;

  @Column('decimal', { name: 'value', nullable: true, precision: 10, scale: 2 })
  value: string | null;

  @Column('varchar', {
    name: 'email',
    nullable: true,
    unique: true,
    length: 255,
  })
  email: string | null;

  @OneToMany(() => AssignmentsEntity, (assignments) => assignments.client)
  assignments: AssignmentsEntity[];
}
