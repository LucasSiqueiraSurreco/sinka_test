import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsEntity } from './entities/assignments.entity';
import { AssignmentsRepository } from './repositories/assignments.repository';
import { AssignmentsService } from './services/assignments.service';
import { OperatorsModule } from '@modules/operators/operators.module';
import { ClientsModule } from '@modules/clients/clients.module';

@Module({
    imports: [TypeOrmModule.forFeature([AssignmentsEntity]), ClientsModule, OperatorsModule],
    controllers: [],
    providers: [AssignmentsService, AssignmentsRepository],
    exports: [AssignmentsRepository],
})
export class AssignmentsModule {}
