import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateEventDto } from './dtos/create-event.dto';
import { UpdateEventDto } from './dtos/update-event.dto';
import { EventFilterDto } from './dtos/event-filter.dto';

import { CreateEventCommand } from './commands/impl/create-event.command';
import { UpdateEventCommand } from './commands/impl/update-event.command';
import { DeleteEventCommand } from './commands/impl/delete-event.command';
import { GetEventsQuery } from './queries/impl/get-events.query';
import { GetEventByIdQuery } from './queries/impl/get-event-by-id.query';

@Injectable()
export class EventsService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(dto: CreateEventDto) {
    return this.commandBus.execute(
      new CreateEventCommand(dto.island_id, dto.title, dto.type, dto.description, dto.order)
    );
  }

  findAll(query: EventFilterDto) {
    return this.queryBus.execute(
      new GetEventsQuery(query.page, query.limit, query.island_id, query.type)
    );
  }

  findOne(id: number) {
    return this.queryBus.execute(new GetEventByIdQuery(id));
  }

  update(id: number, dto: UpdateEventDto) {
    return this.commandBus.execute(
      new UpdateEventCommand(id, dto.island_id, dto.title, dto.type, dto.description, dto.order)
    );
  }

  remove(id: number) {
    return this.commandBus.execute(new DeleteEventCommand(id));
  }
}
