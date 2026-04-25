import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';

import { GetArcsQuery } from '../impl/get-arcs.query';
import { Arc } from 'src/arcs/models/arc.model';

@QueryHandler(GetArcsQuery)
export class GetArcsHandler implements IQueryHandler<GetArcsQuery> {
  constructor(
    @InjectModel(Arc)
    private readonly arcModel: typeof Arc,
  ) {}

  async execute(query: GetArcsQuery) {
    const { page, limit, saga_id } = query;

    const offset = (page - 1) * limit;

    const where: any = {};

    // filtro por saga
    if (saga_id !== undefined) {
      where.saga_id = saga_id;
    }

    const { rows, count } = await this.arcModel.findAndCountAll({
      where,
      limit,
      offset,
      order: [
        ['saga_id', 'ASC'],
        ['order', 'ASC'],
      ],
    });

    return {
      data: rows,
      meta: {
        total: count,
        page,
        last_page: Math.ceil(count / limit),
      },
    };
  }
}