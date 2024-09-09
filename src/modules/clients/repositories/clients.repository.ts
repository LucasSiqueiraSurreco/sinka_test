import { HttpException, Injectable } from '@nestjs/common';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { ClientsEntity } from '../entities/clients.entity';
import { ClientsDto } from '../dtos/clients.dto';
import { format, parse } from 'date-fns';
import { StatusJobsAssignmentEnum } from '@common/enums/status-job.enum';

@Injectable()
export class ClientsRepository extends Repository<ClientsEntity> {
    constructor(private dataSource: DataSource) {
        super(ClientsEntity, dataSource.createEntityManager());
    }

    async clientRegister(body: ClientsDto, entityManager: EntityManager): Promise<ClientsEntity> {
        try {
            const birthDate = body.birth ? format(parse(body.birth, 'dd/MM/yyyy', new Date()), 'yyyy-MM-dd') : null;

            const create = this.create({
                name: body.name,
                email: body.email,
                birth: birthDate,
                value: body.value,
                createdAt: new Date(),
                createdBy: 'system',
            });
            return await entityManager.save(ClientsEntity, create);
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

    async clientsToProcess(limit: number, offset: number): Promise<any[]> {
        try {
            return this.createQueryBuilder('clients')
                .select([
                    'clients.id as clientId',
                    'clients.name as clientId',
                    'clients.email as email',
                    'clients.createdAt as createdAt',
                    'clients.createdBy as createdBy',
                    'clients.updatedAt as updatedAt',
                    'clients.updatedBy as updatedBy',
                    'clients.deletedAt as deletedAt',
                    'clients.deletedBy as deletedBy',

                    'clients.isAssigned as clientsIsAssigned',
                ])
                .where('clients.isAssigned = :status', { status: StatusJobsAssignmentEnum.PENDING })
                .orderBy('clients.createdAt', 'ASC')
                .limit(limit)
                .offset(offset)
                .getRawMany();
        } catch (error) {
            console.error({
                context: this.clientsToProcess.name,
                message: error.message,
                status: false,
            });

            throw new HttpException(
                {
                    message: error.message,
                    status: false,
                    status_code: error.status_code || 4000,
                },
                error.status,
            );
        }
    }

    async updateAllJobProcessStatus(
        tables: string[],
        idsArray: string[][],
        newStatus: StatusJobsAssignmentEnum,
    ): Promise<void> {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            for (let i = 0; i < tables.length; i++) {
                await queryRunner.manager
                    .createQueryBuilder()
                    .update(tables[i])
                    .set({ isJobProcess: newStatus })
                    .whereInIds(idsArray[i])
                    .execute();
            }

            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            console.error('Error in updateAllJobProcessStatus:', error);
            throw error;
        } finally {
            await queryRunner.release();
        }
    }
}
