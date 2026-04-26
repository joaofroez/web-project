import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { NotFoundException } from '@nestjs/common';
import { GetCharacterQuery } from '../impl/get-character.query';
import { Character } from '../../models/character.model';

@QueryHandler(GetCharacterQuery)
export class GetCharacterHandler implements IQueryHandler<GetCharacterQuery> {
  constructor(
    @InjectModel(Character)
    private readonly characterModel: typeof Character,
  ) {}

  async execute(query: GetCharacterQuery) {
    const character = await this.characterModel.findByPk(query.id);
    if (!character) {
      throw new NotFoundException(`Character com ID ${query.id} não encontrado`);
    }
    return character;
  }
}
