import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientsRepository } from '@modules/clients/repositories/clients.repository';
import { ClientsDto } from '../dtos/clients.dto';
import * as fs from 'fs';
import * as csv from 'csv-parser';
import { StatusJobsAssignmentEnum } from '@common/enums/status-job.enum';
import { EntityManager } from 'typeorm';

@Injectable()
export class ClientsService {
    constructor(
        @InjectRepository(ClientsRepository)
        private readonly repository: ClientsRepository,
    ) {}

    async clientRegister(body: ClientsDto) {
        return this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.clientRegister(body, entityManager);
        });
    }

    async registerFromCsv(filePath: string) {
        const results: ClientsDto[] = [];

        return new Promise((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => results.push(data))
                .on('end', async () => {
                    try {
                        await this.repository.manager.transaction(async (entityManager) => {
                            for (const clientData of results) {
                                await this.repository.clientRegister(clientData, entityManager);
                            }
                        });
                        resolve('Dados cadastrados com sucesso!');
                    } catch (error) {
                        reject(error);
                    }
                })
                .on('error', (error) => reject(error));
        });
    }

    async updateClientStatus(clientId: string, status: StatusJobsAssignmentEnum, entityManager: EntityManager) {
        try {
            await entityManager
                .createQueryBuilder()
                .update('clients')
                .set({ isAssigned: status })
                .where('id = :clientId', { clientId })
                .execute();
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Error when trying to update client status.',
                    status: false,
                    status_code: error.status_code || 5000,
                },
                error.status || 500,
            );
        }
    }
}
