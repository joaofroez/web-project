import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { UpdateCharacterVersionCommand } from '../impl/update-character-version.command';
import { CharacterVersion } from '../../models/character-version.model';
import { Character } from '../../../characters/models/character.model';

@CommandHandler(UpdateCharacterVersionCommand)
export class UpdateCharacterVersionHandler implements ICommandHandler<UpdateCharacterVersionCommand> {
  constructor(
    @InjectModel(CharacterVersion)
    private readonly characterVersionModel: typeof CharacterVersion,
    @InjectModel(Character)
    private readonly characterModel: typeof Character,
  ) {}

  async execute(command: UpdateCharacterVersionCommand) {
    const version = await this.characterVersionModel.findByPk(command.id);
    if (!version) {
      throw new NotFoundException(`CharacterVersion com ID ${command.id} não encontrada`);
    }

    if (command.data.character_id) {
        const character = await this.characterModel.findByPk(command.data.character_id);
        if (!character) {
            throw new NotFoundException(`Character com ID ${command.data.character_id} não encontrado`);
        }
    }

    return version.update(command.data);
  }
}
