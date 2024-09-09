import { Module } from '@nestjs/common';
import { JobClientDistribuitionService } from './services/job-client-distribuition.service';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OperatorsModule } from '@modules/operators/operators.module';
import { ClientsModule } from '@modules/clients/clients.module';
import { ClientsEntity } from '@modules/clients/entities/clients.entity';
import { AssignmentsEntity } from '@modules/assignments/entities/assignments.entity';
import { AssignmentsModule } from '@modules/assignments/assignments.module';
import { OperatorsEntity } from '@modules/operators/entities/operators.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([OperatorsEntity, ClientsEntity, AssignmentsEntity]),
        OperatorsModule,
        ClientsModule,
        AssignmentsModule,
        ScheduleModule.forRoot(),
    ],
    controllers: [],
    providers: [JobClientDistribuitionService],
    exports: [JobClientDistribuitionService],
})
export class JobsModule {}
