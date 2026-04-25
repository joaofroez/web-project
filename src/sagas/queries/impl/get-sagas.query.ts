export class GetSagasQuery {
  constructor(
    public readonly page: number,
    public readonly limit: number,
  ) {}
}