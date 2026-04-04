import { UsersFilterDto } from "../../dtos/users-filter.dto";

export class GetUsersQuery {
  constructor(public readonly filters: UsersFilterDto) { }
}
