import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { CreateCharacterVersionsBulkCommand } from '../impl/create-character-versions-bulk.command';
import { CharacterVersion } from '../../models/character-version.model';
import { Character } from '../../../characters/models/character.model';

@CommandHandler(CreateCharacterVersionsBulkCommand)
export class CreateCharacterVersionsBulkHandler implements ICommandHandler<CreateCharacterVersionsBulkCommand> {
  constructor(
    @InjectModel(CharacterVersion)
    private readonly characterVersionModel: typeof CharacterVersion,
    @InjectModel(Character)
    private readonly characterModel: typeof Character,
  ) {}

  async execute(command: CreateCharacterVersionsBulkCommand) {
    // Para bulk create, primeiro validamos se todos os character_ids existem
    const characterIds = [...new Set(command.data.map(item => item.character_id))];
    const existingCharacters = await this.characterModel.findAll({
      where: { id: characterIds }
    });

    if (existingCharacters.length !== characterIds.length) {
      throw new NotFoundException(`Um ou mais Characters informados não existem no banco de dados.`);
    }

    return this.characterVersionModel.bulkCreate(command.data as any[]);
  }
}
