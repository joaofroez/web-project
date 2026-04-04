import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/user.model';
import { Profile } from '../profiles/models/profile.model';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { CreateUserHandler } from './commands/handlers/create-user.handler';
import { GetUsersHandler } from './queries/handlers/get-users.handler';
import { UpdateUserHandler } from './commands/handlers/update-user.handler';
import { DeleteUserHandler } from './commands/handlers/delete-user.handler';
import { GetUserByIdHandler } from './queries/handlers/get-user-by-id.handler';

@Module({
  imports: [CqrsModule, SequelizeModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [
    UsersService,
    CreateUserHandler,
    GetUsersHandler,
    UpdateUserHandler,
    DeleteUserHandler,
    GetUserByIdHandler,
  ],
})
export class UsersModule { }
