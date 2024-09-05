import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsEntity } from './entities/assignments.entity';
import { AssignmentsRepository } from './repositories/assignments.repository';
import { AssignmentsService } from './services/assignments.service';

@Module({
    imports: [TypeOrmModule.forFeature([AssignmentsEntity])],
    controllers: [],
    providers: [AssignmentsService, AssignmentsRepository],
    exports: [AssignmentsRepository],
})
export class AssignmentsModule {}
