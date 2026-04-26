import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { Event } from './models/event.model';
import { Island } from '../islands/models/island.model';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

import { CreateEventHandler } from './commands/handlers/create-event.handler';
import { UpdateEventHandler } from './commands/handlers/update-event.handler';
import { DeleteEventHandler } from './commands/handlers/delete-event.handler';
import { GetEventsHandler } from './queries/handlers/get-events.handler';
import { GetEventByIdHandler } from './queries/handlers/get-event-by-id.handler';

const CommandHandlers = [CreateEventHandler, UpdateEventHandler, DeleteEventHandler];
const QueryHandlers = [GetEventsHandler, GetEventByIdHandler];

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature([Event, Island])],
  controllers: [EventsController],
  providers: [
    EventsService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
  exports: [EventsService],
})
export class EventsModule {}
