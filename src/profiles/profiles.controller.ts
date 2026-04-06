import { Controller, Post, Get, Body, Query, Param, Patch, Delete, ParseIntPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '@/common/guards/permissions.guard';
import { RequirePermissions } from '@/common/decorators/require-permissions.decorator';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dtos/create-profile.dto';
import { ProfileFilterDto } from './dtos/profile-filter.dto';
import { UpdateProfileDto } from './dtos/update-profile.dto';
import { UpdateProfilePermissionsDto } from './dtos/update-profile-permissions.dto';

@ApiBearerAuth('access-token')
@ApiTags('Profiles')
@Controller('profiles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) { }

  @ApiOperation({ summary: 'Criar um novo perfil' })
  @RequirePermissions('profiles.create')
  @Post()
  create(@Body() body: CreateProfileDto) {
    return this.profilesService.create(body);
  }

  @ApiOperation({ summary: 'Vincular permissões a um perfil (Substituir atual)' })
  @RequirePermissions('profiles.assign')
  @Post(':id/permissions')
  updatePermissions(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProfilePermissionsDto,
  ) {
    return this.profilesService.updatePermissions(id, body);
  }

  @ApiOperation({ summary: 'Listar todos os perfis com filtros e paginação' })
  @RequirePermissions('profiles.view')
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
