import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException, ConflictException } from '@nestjs/common';
import { AddCharacterToIslandCommand } from '../impl/add-character-to-island.command';
import { IslandCharacterVersion } from '../../models/island-character-version.model';
import { CharacterVersion } from '../../../character-versions/models/character-version.model';
import { Island } from '../../../islands/models/island.model';
import { Arc } from '../../../arcs/models/arc.model';

@CommandHandler(AddCharacterToIslandCommand)
export class AddCharacterToIslandHandler implements ICommandHandler<AddCharacterToIslandCommand> {
  constructor(
    @InjectModel(IslandCharacterVersion)
    private readonly pivotModel: typeof IslandCharacterVersion,
    @InjectModel(CharacterVersion)
    private readonly versionModel: typeof CharacterVersion,
    @InjectModel(Island)
    private readonly islandModel: typeof Island,
  ) {}

  async execute(command: AddCharacterToIslandCommand) {
    const { character_version_id, island_id, order } = command.data;

    const version = await this.versionModel.findByPk(character_version_id, {
      include: [{ model: Arc, attributes: ['id', 'order'] }],
    });
    if (!version) {
      throw new NotFoundException(`CharacterVersion com ID ${character_version_id} não encontrada.`);
    }

    const island = await this.islandModel.findByPk(island_id, {
      include: [{ model: Arc, attributes: ['id', 'order'] }],
    });
    if (!island) {
      throw new NotFoundException(`Island com ID ${island_id} não encontrada.`);
    }

    // impede duplicata exata na mesma ilha
    const exactDuplicate = await this.pivotModel.findOne({
      where: { character_version_id, island_id },
    });
    if (exactDuplicate) {
      throw new ConflictException('Esta versão do personagem já está vinculada a esta ilha.');
    }

    // impede mais de uma versão do mesmo personagem no mesmo arco
    const otherVersionsSameArc = await this.versionModel.findAll({
      where: { character_id: version.character_id, arc_id: version.arc_id },
    });
    const otherVersionIds = otherVersionsSameArc
      .filter((v) => v.id !== version.id)
      .map((v) => v.id);

    if (otherVersionIds.length > 0) {
      const conflicting = await this.pivotModel.findOne({
        where: { character_version_id: otherVersionIds },
      });
      if (conflicting) {
        throw new ConflictException(
          `O personagem já possui outra versão vinculada a uma ilha neste mesmo arco (arc_id: ${version.arc_id}).`,
        );
      }
    }

    // versão mais atual não pode ser vinculada a uma ilha de um arco anterior
    if (version.arc.order > island.arc.order) {
      throw new ConflictException(
        `A versão do personagem pertence ao arco de ordem ${version.arc.order}, mais recente que o arco da ilha (ordem ${island.arc.order}). Versões mais atuais não podem existir em períodos anteriores.`,
      );
    }

    return this.pivotModel.create({ character_version_id, island_id, order });
  }
}
