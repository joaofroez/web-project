import { IsOptional, IsInt, Min } from 'class-validator';

export class FilterArcDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @IsOptional()
  @IsInt()
  saga_id?: number;
}