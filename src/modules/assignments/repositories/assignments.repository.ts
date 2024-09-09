import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { AssignmentsEntity } from '../entities/assignments.entity';
import { AssignmentsDto } from '../dtos/assignments.dto';
import { ClientsRepository } from '@modules/clients/repositories/clients.repository';
import { OperatorsRepository } from '@modules/operators/repositories/operators.repository';

@Injectable()
export class AssignmentsRepository extends Repository<AssignmentsEntity> {
    constructor(
        private dataSource: DataSource,
        private clientsRepository: ClientsRepository,
        private operatorsRepository: OperatorsRepository,
    ) {
        super(AssignmentsEntity, dataSource.createEntityManager());
    }

    async assignmentRegister(body: AssignmentsDto, entityManager: EntityManager): Promise<AssignmentsEntity> {
        try {
            const client = await this.clientsRepository.findOne({
                where: { id: body.clientId },
                select: ['name', 'email'],
            });

            const operator = await this.operatorsRepository.findOne({
                where: { id: body.operatorId },
                select: ['name'],
            });

            if (!client) {
                throw new HttpException({ message: 'Cliente não encontrado.', status: false, status_code: 404 }, 404);
            }

            if (!operator) {
                throw new HttpException({ message: 'Operador não encontrado.', status: false, status_code: 404 }, 404);
            }

            const create = this.create({
                operatorId: body.operatorId,
                operatorName: operator.name,
                clientId: body.clientId,
                clientName: client.name,
                clientEmail: client.email,
                createdAt: new Date(),
                createdBy: 'system',
            });
            return await entityManager.save(AssignmentsEntity, create);
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                error.message = `Cliente já registrado.`;
                error.status_code = 4009;
                error.status = 409;
            }

            throw new HttpException(
                {
                    message: error.message,
                    status: false,
                    status_code: error.status_code || 4000,
                },
                error.status || 500,
            );
        }
    }
}
