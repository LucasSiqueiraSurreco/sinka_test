import { Module } from '@nestjs/common';
import { OperatorsModule } from './operators/operators.module';
import { ClientsModule } from './clients/clients.module';
import { JobsModule } from './jobs/jobs.module';

@Module({
    imports: [OperatorsModule, ClientsModule, JobsModule],
    providers: [OperatorsModule, ClientsModule, JobsModule],
    exports: [OperatorsModule, ClientsModule, JobsModule],
})
export class ModulesModule {}
