import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { CreateCharacterVersionCommand } from '../impl/create-character-version.command';
import { CharacterVersion } from '../../models/character-version.model';
import { Character } from '../../../characters/models/character.model';
import { Arc } from '../../../arcs/models/arc.model';

@CommandHandler(CreateCharacterVersionCommand)
export class CreateCharacterVersionHandler implements ICommandHandler<CreateCharacterVersionCommand> {
  constructor(
    @InjectModel(CharacterVersion)
    private readonly characterVersionModel: typeof CharacterVersion,
    @InjectModel(Character)
    private readonly characterModel: typeof Character,
    @InjectModel(Arc)
    private readonly arcModel: typeof Arc,
  ) {}

  async execute(command: CreateCharacterVersionCommand) {
    const { character_id, arc_id } = command.data;

    // validação do personagem
    const character = await this.characterModel.findByPk(character_id);
    if (!character) {
      throw new NotFoundException(`Character com ID ${character_id} não encontrado`);
    }

    // validação do arco
    const arc = await this.arcModel.findByPk(arc_id);
    if (!arc) {
      throw new NotFoundException(`Arc com ID ${arc_id} não encontrado`);
    }

    return this.characterVersionModel.create(command.data as any);
  }
}
