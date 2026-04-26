import { IsOptional, IsString, IsNumber, IsBoolean, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateIslandDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  arc_id?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coordinate_x?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coordinate_y?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coordinate_z?: number;

  @IsOptional()
  @IsString()
  model_url?: string;

  @IsOptional()
  @IsUrl()
  thumbnail_url?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}