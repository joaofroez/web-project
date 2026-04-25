import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { BadRequestException } from '@nestjs/common';

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

    // REGRA 1 — order deve ser único
    const existingSaga = await this.sagaModel.findOne({
      where: { order },
    });

    if (existingSaga) {
      throw new BadRequestException(
        'Já existe uma saga com essa ordem',
      );
    }

    // REGRA 2 — (opcional mas recomendada) nome único
    const existingName = await this.sagaModel.findOne({
      where: { name },
    });

    if (existingName) {
      throw new BadRequestException(
        'Já existe uma saga com esse nome',
      );
    }

    // criação
    const saga = await this.sagaModel.create({
      name,
      order,
    });

    return saga;
  }
}