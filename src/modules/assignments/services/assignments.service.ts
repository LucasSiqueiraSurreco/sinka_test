import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AssignmentsDto } from '../dtos/assignments.dto';
import { AssignmentsRepository } from '../repositories/assignments.repository';
import { AssignmentsItem, AssignmentsModel } from '../models/assignments.model';
import * as fs from 'fs';
import { Parser } from 'json2csv';

@Injectable()
export class AssignmentsService {
    constructor(
        @InjectRepository(AssignmentsRepository)
        private readonly repository: AssignmentsRepository,
    ) {}

    async assignmentRegister(body: AssignmentsDto) {
        return this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.assignmentRegister(body, entityManager);
        });
    }

    async getAllAssignments(): Promise<AssignmentsModel> {
        const entities = await this.repository.getAllAssignments();
        const items = entities.map(
            (entity) =>
                new AssignmentsItem({
                    clientId: entity.clientId,
                    clientName: entity.clientName,
                    clientEmail: entity.clientEmail,
                    operatorId: entity.operatorId,
                    operatorName: entity.operatorName,
                }),
        );

        const model = new AssignmentsModel({
            items,
            meta: { total: items.length },
        });

        return model;
    }

    async exportToCsv(filePath: string): Promise<string> {
        const entities = await this.repository.getAllAssignments();

        const data = entities.map((entity) => ({
            clientName: entity.clientName,
            clientEmail: entity.clientEmail,
            operatorName: entity.operatorName,
        }));

        try {
            const json2csvParser = new Parser({
                fields: [
                    { label: 'Nome do Cliente', value: 'clientName' },
                    { label: 'E-mail do Cliente', value: 'clientEmail' },
                    { label: 'Nome do Operador', value: 'operatorName' },
                ],
            });

            const csvData = json2csvParser.parse(data);

            fs.writeFileSync(filePath, csvData);

            return 'CSV exportado com sucesso!';
        } catch (error) {
            throw new HttpException(
                {
                    message: 'Erro ao exportar os dados para CSV.',
                    status: false,
                    status_code: 5001,
                },
                500,
            );
        }
    }

    async removeAssignment(id: string) {
        return this.repository.manager.transaction(async (entityManager) => {
            return await this.repository.removeAssignment(id, entityManager);
        });
    }
}
