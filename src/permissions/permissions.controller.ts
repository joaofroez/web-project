import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PermissionsService } from './permissions.service';
import { CreatePermissionDto } from './dtos/create-permission.dto';
import { UpdatePermissionDto } from './dtos/update-permission.dto';
import { PermissionFilterDto } from './dtos/filter-permission.dto';

@ApiTags('Permissions')
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) { }

  @Post() @ApiOperation({ summary: 'Criar permissão' })
  create(@Body() data: CreatePermissionDto) { return this.permissionsService.create(data); }

  @Get() @ApiOperation({ summary: 'Listar permissões' })
  findAll(@Query() filters: PermissionFilterDto) { return this.permissionsService.findAll(filters); }

  @Get(':id') @ApiOperation({ summary: 'Buscar por ID' })
  findOne(@Param('id', ParseIntPipe) id: number) { return this.permissionsService.findOne(id); }

  @Patch(':id') @ApiOperation({ summary: 'Atualizar permissão' })
  update(@Param('id', ParseIntPipe) id: number, @Body() data: UpdatePermissionDto) { return this.permissionsService.update(id, data); }

  @Delete(':id') @ApiOperation({ summary: 'Remover permissão' })
  remove(@Param('id', ParseIntPipe) id: number) { return this.permissionsService.remove(id); }
}
