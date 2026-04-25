import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';

import { Saga } from './models/saga.model';
import { Arc } from 'src/arcs/models/arc.model';

import { SagasController } from './sagas.controller';
import { SagasService } from './sagas.service';

import { GetSagasHandler } from './queries/handlers/get-sagas.handler';

// Commands
import { CreateSagaHandler } from './commands/handlers/create-saga.handler';
import { UpdateSagaHandler } from './commands/handlers/update-saga.handler';
import { DeleteSagaHandler } from './commands/handlers/delete-saga.handler';

const CommandHandlers = [
  CreateSagaHandler,
  UpdateSagaHandler,
  DeleteSagaHandler,
];

const QueryHandlers = [GetSagasHandler];

@Module({
  imports: [
    CqrsModule,
    SequelizeModule.forFeature([Saga, Arc]),
  ],
  controllers: [SagasController],
  providers: [SagasService, 
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [SagasService],
})
export class SagasModule {}