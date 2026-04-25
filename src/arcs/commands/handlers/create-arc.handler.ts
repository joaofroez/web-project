import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import { CreateArcCommand } from '../impl/create-arc.command';
import { Arc } from 'src/arcs/models/arc.model';
import { Saga } from 'src/sagas/models/saga.model';

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

    // REGRA 1 — Saga deve existir
    const saga = await this.sagaModel.findByPk(saga_id);
    if (!saga) {
      throw new NotFoundException('Saga não encontrada');
    }

    // REGRA 2 — order deve ser único dentro da saga
    const existingOrder = await this.arcModel.findOne({
      where: { saga_id, order },
    });

    if (existingOrder) {
      throw new BadRequestException(
        'Já existe um arco com essa ordem nessa saga',
      );
    }

    // REGRA 3 — nome único dentro da saga
    const existingName = await this.arcModel.findOne({
      where: { saga_id, name },
    });

    if (existingName) {
      throw new BadRequestException(
        'Já existe um arco com esse nome nessa saga',
      );
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