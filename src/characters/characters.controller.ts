import { Controller, Post, Get, Body, Query, Param, Patch, Delete, ParseIntPipe, ParseArrayPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CharactersService } from './characters.service';
import { CreateCharacterDto } from './dtos/create-character.dto';
import { CharacterFilterDto } from './dtos/character-filter.dto';
import { UpdateCharacterDto } from './dtos/update-character.dto';

@ApiTags('Characters')
@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @ApiOperation({ summary: 'Criar um novo personagem' })
  @Post()
  create(@Body() body: CreateCharacterDto) {
    return this.charactersService.create(body);
  }

  @ApiOperation({ summary: 'Criar múltiplos personagens em lote (Bulk)' })
  @ApiBody({ type: [CreateCharacterDto] })
  @Post('bulk')
  createBulk(@Body(new ParseArrayPipe({ items: CreateCharacterDto })) bodies: CreateCharacterDto[]) {
    return this.charactersService.createBulk(bodies);
  }

  @ApiOperation({ summary: 'Listar personagens com filtros e paginação' })
  @Get()
  findAll(@Query() params: CharacterFilterDto) {
    return this.charactersService.findAll(params);
  }

  @ApiOperation({ summary: 'Buscar personagem pelo ID' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.findOne(id);
  }

  @ApiOperation({ summary: 'Atualizar um personagem existente' })
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateCharacterDto) {
    return this.charactersService.update(id, body);
  }

  @ApiOperation({ summary: 'Remover um personagem (Soft Delete)' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.charactersService.remove(id);
  }
}
