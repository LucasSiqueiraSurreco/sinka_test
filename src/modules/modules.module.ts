import { Module } from '@nestjs/common';
import { OperatorsModule } from './operators/operators.module';
import { ClientsModule } from './clients/clients.module';

@Module({
  imports: [OperatorsModule, ClientsModule],
  providers: [OperatorsModule, ClientsModule],
  exports: [OperatorsModule, ClientsModule],
})
export class ModulesModule {}
