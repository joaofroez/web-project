import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Op } from 'sequelize';

import { CreateArcCommand } from '../impl/create-arc.command';
import { Arc } from '../../models/arc.model';
import { Saga } from '../../../sagas/models/saga.model';

@CommandHandler(CreateArcCommand)
export class CreateArcHandler implements ICommandHandler<CreateArcCommand> {
  constructor(
    @InjectModel(Arc)
    private readonly arcModel: typeof Arc,

    @InjectModel(Saga)
    private readonly sagaModel: typeof Saga,
  ) {}

  async execute(command: CreateArcCommand): Promise<Arc> {
    const { name, description, saga_id, order } = command;

    // validação da existência da saga
    const saga = await this.sagaModel.findByPk(saga_id);
    if (!saga) {
      throw new NotFoundException('Saga não encontrada');
    }

    // impede duplicidade de ordem ou nome dentro da mesma saga
    const existing = await this.arcModel.findOne({
      where: {
        saga_id,
        [Op.or]: [{ order }, { name }],
      },
    });

    if (existing) {
      if (existing.order === order) {
        throw new BadRequestException(
          'Já existe um arco com essa ordem nessa saga',
        );
      }

      if (existing.name === name) {
        throw new BadRequestException(
          'Já existe um arco com esse nome nessa saga',
        );
      }
    }

    // criação
    const arc = await this.arcModel.create({
      name,
      description,
      saga_id,
      order,
    });

    return arc;
  }
}