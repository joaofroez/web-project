import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { GetCharactersQuery } from '../impl/get-characters.query';
import { Character } from '../../models/character.model';

@QueryHandler(GetCharactersQuery)
export class GetCharactersHandler implements IQueryHandler<GetCharactersQuery> {
  constructor(
    @InjectModel(Character)
    private readonly characterModel: typeof Character,
  ) {}

  async execute(query: GetCharactersQuery) {
    const { page = 1, limit = 10, name, slug } = query.filters;
    const offset = (page - 1) * limit;

    const where: any = {};
    if (name) where.name = { [Op.iLike]: `%${name}%` };
    if (slug) where.slug = { [Op.iLike]: `%${slug}%` };

    return this.characterModel.findAndCountAll({
      where,
      limit: Number(limit),
      offset: Number(offset),
    });
  }
}
