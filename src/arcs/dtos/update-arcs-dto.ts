import { IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class UpdateArcDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  saga_id?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;
}