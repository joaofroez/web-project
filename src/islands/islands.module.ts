import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CqrsModule } from '@nestjs/cqrs';

import { IslandsController } from './islands.controller';
import { IslandsService } from './islands.service';

import { Island } from './models/island.model';

import { Arc } from 'src/arcs/models/arc.model';
import { CharacterVersion } from 'src/character-versions/models/character-version.model';
import { Character } from 'src/characters/models/character.model';
import { IslandCharacterVersion } from 'src/island-character-versions/models/island-character-version.model';

import { CreateIslandHandler } from './commands/handlers/create-island.handler';
import { UpdateIslandHandler } from './commands/handlers/update-island.handler';
import { DeleteIslandHandler } from './commands/handlers/delete-island.handler';

import { GetIslandDetailsHandler } from './queries/handlers/get-island-details.handler';
import { GetIslandsHandler } from './queries/handlers/get-islands.handler';

const CommandHandlers = [
  CreateIslandHandler,
  UpdateIslandHandler,
  DeleteIslandHandler,  
];

const QueryHandlers = [
  GetIslandDetailsHandler,
  GetIslandsHandler,
];

@Module({
  imports: [
    CqrsModule,
    SequelizeModule.forFeature([
      Island,
      Arc,
      CharacterVersion,
      Character,
      IslandCharacterVersion,
    ]),
  ],
  controllers: [IslandsController],
  providers: [
    IslandsService,
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class IslandsModule {}