import { IsOptional, IsString, MaxLength, IsInt, Min } from 'class-validator';

export class UpdateSagaDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  order?: number;
}