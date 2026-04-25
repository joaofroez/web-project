import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException } from '@nestjs/common';
import { Op } from 'sequelize';

import { CreateSagaCommand } from '../impl/create-saga.command';
import { Saga } from 'src/sagas/models/saga.model';

@CommandHandler(CreateSagaCommand)
export class CreateSagaHandler implements ICommandHandler<CreateSagaCommand> {
  constructor(
    @InjectModel(Saga)
    private readonly sagaModel: typeof Saga,
  ) {}

  async execute(command: CreateSagaCommand): Promise<Saga> {
    const { name, order } = command;

    const existing = await this.sagaModel.findOne({
      where: {
        [Op.or]: [{ order }, { name }],
      },
    });

    if (existing) {
      if (existing.order === order) {
        throw new BadRequestException(
          'Já existe uma saga com essa ordem',
        );
      }

      if (existing.name === name) {
        throw new BadRequestException(
          'Já existe uma saga com esse nome',
        );
      }
    }

    return this.sagaModel.create({
      name,
      order,
    });
  }
}