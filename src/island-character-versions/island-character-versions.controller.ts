import { Controller, Post, Get, Body, Query, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { IslandCharacterVersionsService } from './island-character-versions.service';
import { AddCharacterToIslandDto } from './dtos/add-character-to-island.dto';
import { IslandCharacterFilterDto } from './dtos/island-character-filter.dto';

@ApiTags('IslandCharacterVersions')
@Controller('island-character-versions')
export class IslandCharacterVersionsController {
  constructor(private readonly islandCharacterVersionsService: IslandCharacterVersionsService) {}

  @ApiOperation({ summary: 'Vincular uma versão de personagem a uma Ilha' })
  @Post()
  addCharacterToIsland(@Body() body: AddCharacterToIslandDto) {
    return this.islandCharacterVersionsService.addCharacterToIsland(body);
  }

  @ApiOperation({ summary: 'Listar quais versões de personagens estavam em quais Ilhas' })
  @Get()
  getCharactersByIsland(@Query() params: IslandCharacterFilterDto) {
    return this.islandCharacterVersionsService.getCharactersByIsland(params);
  }

  @ApiOperation({ summary: 'Remover o vínculo de um personagem com uma Ilha' })
  @Delete(':island_id/:character_version_id')
  removeCharacterFromIsland(
    @Param('island_id', ParseIntPipe) island_id: number,
    @Param('character_version_id', ParseIntPipe) character_version_id: number
  ) {
    return this.islandCharacterVersionsService.removeCharacterFromIsland(island_id, character_version_id);
  }
}
