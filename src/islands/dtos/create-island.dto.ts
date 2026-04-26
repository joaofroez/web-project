import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsUrl,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateIslandDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @Type(() => Number)
  @IsNumber()
  arc_id!: number;

  @Type(() => Number)
  @IsNumber()
  coordinate_x!: number;

  @Type(() => Number)
  @IsNumber()
  coordinate_y!: number;

  @Type(() => Number)
  @IsNumber()
  coordinate_z!: number;

  @IsString()
  @IsNotEmpty()
  model_url!: string;

  @IsOptional()
  @IsUrl()
  thumbnail_url?: string;

  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}