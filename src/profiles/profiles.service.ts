import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProfileCommand } from './commands/impl/create-profile.command';
import { GetProfilesQuery } from './queries/impl/get-profiles.query';
import { UpdateProfileCommand } from './commands/impl/update-profile.command';
import { DeleteProfileCommand } from './commands/impl/delete-profile.command';
import { GetProfileByIdQuery } from './queries/impl/get-profile-by-id.query';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileFilterDto } from './dtos/profile-filter.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@Injectable()
export class ProfilesService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  create(data: CreateProfileDto) {
    return this.commandBus.execute(new CreateProfileCommand(data));
  }

  findAll(filters: ProfileFilterDto) {
    return this.queryBus.execute(new GetProfilesQuery(filters));
  }

  findOne(id: number) {
    return this.queryBus.execute(new GetProfileByIdQuery(id));
  }

  update(id: number, data: UpdateProfileDto) {
    return this.commandBus.execute(new UpdateProfileCommand(id, data));
  }

  remove(id: number) {
    return this.commandBus.execute(new DeleteProfileCommand(id));
  }
}
