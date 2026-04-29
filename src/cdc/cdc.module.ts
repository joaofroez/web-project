import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CdcController } from './cdc.controller';
import { CdcService } from './cdc.service';
import { EventRead } from '../events/models/event-read.model';
import { EventParticipantRead } from '../events/models/event-participant-read.model';
import { CharacterVersionRead } from '../character-versions/models/character-version-read.model';
import { CharacterRead } from '../characters/models/character-read.model';

@Module({
  imports: [
    SequelizeModule.forFeature([EventRead, EventParticipantRead, CharacterVersionRead, CharacterRead], 'read-db')
  ],
  controllers: [CdcController],
  providers: [CdcService],
})
export class CdcModule { }
