import { StatusJobsAssignmentEnum } from '@common/enums/status-job.enum';
import { AssignmentsDto } from '@modules/assignments/dtos/assignments.dto';
import { AssignmentsRepository } from '@modules/assignments/repositories/assignments.repository';
import { ClientsRepository } from '@modules/clients/repositories/clients.repository';
import { OperatorsRepository } from '@modules/operators/repositories/operators.repository';
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class JobClientDistribuitionService implements OnModuleInit {
    private readonly logger = new Logger(JobClientDistribuitionService.name);

    constructor(
        private readonly clientsRepository: ClientsRepository,
        private readonly operatorsRepository: OperatorsRepository,
        private readonly assignmentsRepository: AssignmentsRepository,
    ) {}
    onModuleInit() {
        throw new Error('Method not implemented.');
    }

    @Cron(CronExpression.EVERY_5_SECONDS)
    async handleJobProcessing() {
        this.logger.log('Starting job processing...');

        try {
            const clients = await this.clientsRepository.find({
                where: { isAssigned: StatusJobsAssignmentEnum.PENDING },
            });

            const operators = await this.operatorsRepository.find();

            if (clients.length === 0) {
                this.logger.log('No clients to process.');
                return;
            }

            if (operators.length === 0) {
                this.logger.warn('No operators available.');
                return;
            }

            const assignments: AssignmentsDto[] = [];
            let operatorIndex = 0;

            for (const client of clients) {
                const operator = operators[operatorIndex];

                assignments.push({
                    clientId: client.id,
                    clientName: client.name,
                    clientEmail: client.email,
                    operatorId: operator.id,
                    operatorName: operator.name,
                });

                await this.clientsRepository.update(client.id, { isAssigned: StatusJobsAssignmentEnum.IN_PROCESSING });

                operatorIndex = (operatorIndex + 1) % operators.length;
            }

            await Promise.all(
                assignments.map((assignment) =>
                    this.assignmentsRepository.assignmentRegister(assignment, this.assignmentsRepository.manager),
                ),
            );

            await this.clientsRepository.update(
                { isAssigned: StatusJobsAssignmentEnum.IN_PROCESSING },
                { isAssigned: StatusJobsAssignmentEnum.FINISH },
            );

            this.logger.log('Job processing completed successfully.');
        } catch (error) {
            this.logger.error('Error while processing jobs:', error);
        }
    }
}
