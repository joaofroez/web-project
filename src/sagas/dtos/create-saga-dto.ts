import { IsString, IsNotEmpty, MaxLength, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSagaDto {
  @ApiProperty({ example: 'Saga de Alabasta', description: 'Nome da saga' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @ApiProperty({ example: 1, description: 'Ordem cronológica da saga no sistema' })
  @IsInt()
  @Min(1)
  order!: number;
}