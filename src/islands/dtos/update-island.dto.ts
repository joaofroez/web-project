import { IsOptional, IsString, IsNumber, IsBoolean, IsUrl } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateIslandDto {
  @ApiPropertyOptional({ example: 'Marineford', description: 'Nome da ilha' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: 'Sede da Marinha.', description: 'Descrição detalhada da ilha' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 1, description: 'ID do arco ao qual a ilha pertence' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  arc_id?: number;

  @ApiPropertyOptional({ example: 150.0, description: 'Coordenada X no mapa 3D' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coordinate_x?: number;

  @ApiPropertyOptional({ example: 250.0, description: 'Coordenada Y no mapa 3D' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coordinate_y?: number;

  @ApiPropertyOptional({ example: 60.0, description: 'Coordenada Z no mapa 3D' })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  coordinate_z?: number;

  @ApiPropertyOptional({ example: 'https://models.onepiece.com/islands/marineford.glb', description: 'URL do modelo 3D da ilha' })
  @IsOptional()
  @IsString()
  model_url?: string;

  @ApiPropertyOptional({ example: 'https://images.onepiece.com/islands/marineford.jpg', description: 'URL da miniatura/imagem da ilha' })
  @IsOptional()
  @IsUrl()
  thumbnail_url?: string;

  @ApiPropertyOptional({ description: 'Define se a ilha está ativa no sistema' })
  @IsOptional()
  @IsBoolean()
  is_active?: boolean;
}