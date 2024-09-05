import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsEntity } from './entities/assignments.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AssignmentsEntity])],
  controllers: [],
  providers: [],
  exports: [],
})
export class AssignmentsModule {}
