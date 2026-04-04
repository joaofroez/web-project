import { Controller, Post, Get, Body, Query, Param, Patch, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileFilterDto } from './dtos/profile-filter.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';

@ApiTags('Profiles')
@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @ApiOperation({ summary: 'Criar um novo perfil' })
  @Post()
  create(@Body() body: CreateProfileDto) {
    return this.profilesService.create(body);
  }

  @ApiOperation({ summary: 'Listar todos os perfis com filtros e paginação' })
  @Get()
  findAll(@Query() params: ProfileFilterDto) {
    return this.profilesService.findAll(params);
  }

  @ApiOperation({ summary: 'Buscar perfil pelo ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um perfil existente' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateProfileDto) {
    return this.profilesService.update(id, body);
  }

  @ApiOperation({ summary: 'Remover um perfil (Soft Delete)' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.profilesService.remove(id);
  }
}
