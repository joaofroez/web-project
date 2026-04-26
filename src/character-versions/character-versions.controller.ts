import { Controller, Post, Get, Body, Query, Param, Patch, Delete, ParseIntPipe, ParseArrayPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CharacterVersionsService } from './character-versions.service';
import { CreateCharacterVersionDto } from './dtos/create-character-version.dto';
import { UpdateCharacterVersionDto } from './dtos/update-character-version.dto';
import { CharacterVersionFilterDto } from './dtos/character-version-filter.dto';

@ApiTags('CharacterVersions')
@Controller('character-versions')
export class CharacterVersionsController {
  constructor(private readonly characterVersionsService: CharacterVersionsService) {}

  @ApiOperation({ summary: 'Criar uma nova versão de personagem' })
  @Post()
  create(@Body() body: CreateCharacterVersionDto) {
    return this.characterVersionsService.create(body);
  }

  @ApiOperation({ summary: 'Criar múltiplas versões de personagens em lote (Bulk)' })
  @ApiBody({ type: [CreateCharacterVersionDto] })
  @Post('bulk')
  createBulk(@Body(new ParseArrayPipe({ items: CreateCharacterVersionDto })) bodies: CreateCharacterVersionDto[]) {
    return this.characterVersionsService.createBulk(bodies);
  }

  @ApiOperation({ summary: 'Listar versões de personagens com filtros' })
  @Get()
  findAll(@Query() params: CharacterVersionFilterDto) {
    return this.characterVersionsService.findAll(params);
  }

  @ApiOperation({ summary: 'Buscar versão de personagem pelo ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.characterVersionsService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar uma versão de personagem' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCharacterVersionDto) {
    return this.characterVersionsService.update(id, body);
  }

  @ApiOperation({ summary: 'Remover uma versão de personagem (Soft Delete)' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.characterVersionsService.remove(id);
  }
}
