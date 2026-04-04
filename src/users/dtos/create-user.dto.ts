import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'luffy123', description: 'Nome de usuário único' })
  @IsString() @IsNotEmpty()
  username: string;

  @ApiProperty({ example: 'luffy@onepiece.com', description: 'E-mail único' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'GomuGomu@123', description: 'Senha (mínimo 6 caracteres)' })
  @IsString() @MinLength(6)
  password: string;

  @ApiProperty({ example: 1, description: 'ID do perfil/role do usuário' })
  @IsNotEmpty()
  profile_id: number;
}
