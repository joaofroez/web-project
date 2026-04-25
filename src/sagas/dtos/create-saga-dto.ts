import { IsString, IsNotEmpty, MaxLength, IsInt, Min } from 'class-validator';

export class CreateSagaDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsInt()
  @Min(1)
  order!: number;
}