import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from './commands/impl/create-user.command';
import { GetUsersQuery } from './queries/impl/get-users.query';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersFilterDto } from './dtos/users-filter.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) { }

  create(data: CreateUserDto) {
    return this.commandBus.execute(new CreateUserCommand(data));
  }

  findAll(filters: UsersFilterDto) {
    return this.queryBus.execute(new GetUsersQuery(filters));
  }
}
