import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { RequirePermissions } from '../common/decorators/require-permissions.decorator';

import { IslandsService } from './islands.service';

import { CreateIslandDto } from './dtos/create-island.dto';
import { UpdateIslandDto } from './dtos/update-island.dto';
import { FilterIslandDto } from './dtos/filter-island.dto';

@ApiBearerAuth('access-token')
@ApiTags('Islands')
@Controller('islands')
@UseGuards(JwtAuthGuard, PermissionsGuard)
@ApiResponse({ status: 400, description: 'Requisição inválida.' })
@ApiResponse({ status: 401, description: 'Não autorizado (Token ausente ou inválido).' })
@ApiResponse({ status: 403, description: 'Proibido (Falta de permissão).' })
export class IslandsController {
  constructor(private readonly islandsService: IslandsService) {}

  @ApiOperation({ summary: 'Criar uma nova ilha no mapa' })
  @ApiResponse({ status: 201, description: 'Ilha criada com sucesso.' })
  @RequirePermissions('islands.create')
  @Post()
  create(@Body() dto: CreateIslandDto) {
    return this.islandsService.create(dto);
  }

  @ApiOperation({ summary: 'Listar ilhas com filtros e paginação' })
  @ApiResponse({ status: 200, description: 'Lista de ilhas retornada com sucesso.' })
  @RequirePermissions('islands.view')
  @Get()
  findAll(@Query() query: FilterIslandDto) {
    return this.islandsService.findAll(query);
  }

  @ApiOperation({ summary: 'Obter detalhes completos de uma ilha específica' })
  @ApiResponse({ status: 200, description: 'Detalhes da ilha encontrados.' })
  @ApiResponse({ status: 404, description: 'Ilha não encontrada.' })
  @RequirePermissions('islands.view')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.islandsService.findDetails(id);
  }

  @ApiOperation({ summary: 'Atualizar os dados de uma ilha existente' })
  @ApiResponse({ status: 200, description: 'Ilha atualizada com sucesso.' })
  @ApiResponse({ status: 404, description: 'Ilha não encontrada.' })
  @RequirePermissions('islands.update')
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIslandDto,
  ) {
    return this.islandsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Remover uma ilha do mapa (Soft Delete)' })
  @ApiResponse({ status: 200, description: 'Ilha removida com sucesso.' })
  @ApiResponse({ status: 404, description: 'Ilha não encontrada.' })
  @RequirePermissions('islands.delete')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.islandsService.remove(id);
  }
}