import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';

import { GetSagasQuery } from './get-sagas.query';
import { Saga } from 'src/sagas/models/saga.model';

@QueryHandler(GetSagasQuery)
export class GetSagasHandler implements IQueryHandler<GetSagasQuery> {
  constructor(
    @InjectModel(Saga)
    private readonly sagaModel: typeof Saga,
  ) {}

  async execute(query: GetSagasQuery) {
    const { page, limit } = query;

    const offset = (page - 1) * limit;

    const { rows, count } = await this.sagaModel.findAndCountAll({
      limit,
      offset,
      order: [['order', 'ASC']],
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