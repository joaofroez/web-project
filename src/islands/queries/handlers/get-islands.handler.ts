import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

import { GetIslandsQuery } from '../impl/get-islands.query';
import { Island } from '../../models/island.model';
import { Arc } from '../../../arcs/models/arc.model';

@QueryHandler(GetIslandsQuery)
export class GetIslandsHandler
  implements IQueryHandler<GetIslandsQuery>
{
  constructor(
    @InjectModel(Island)
    private readonly islandModel: typeof Island,
  ) {}

  async execute(query: GetIslandsQuery) {
    const { page, limit, arc_id, is_active } = query;

    const offset = (page - 1) * limit;

    const where: any = {};

    // padrão só ativos
    if (is_active !== undefined) {
      where.is_active = is_active;
    } else {
      where.is_active = true;
    }

    const include: any[] = [];
    if (arc_id) {
      include.push({
        model: Arc,
        where: { id: arc_id },
        through: { attributes: [] }
      });
    }

    const { rows, count } = await this.islandModel.findAndCountAll({
      where,
      attributes: [
        'id',
        'name',
        'coordinate_x',
        'coordinate_y',
        'coordinate_z',
        'model_url',
      ],
      include,
      limit,
      offset,
      distinct: true,
      subQuery: false,
      order: [['id', 'ASC']],
    });

    return {
      data: rows.map((island) => ({
        id: island.id,
        name: island.name,
        coordinates: {
          x: island.coordinate_x,
          y: island.coordinate_y,
          z: island.coordinate_z,
        },
        model_url: island.model_url,
      })),

      meta: {
        total: count,
        page,
        last_page: Math.ceil(count / limit),
      },
    };
  }
}