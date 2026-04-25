import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsInt,
  Min,
} from 'class-validator';

export class CreateArcDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  description!: string;

  @IsInt()
  @Min(1)
  saga_id!: number;

  @IsInt()
  @Min(1)
  order!: number;
}