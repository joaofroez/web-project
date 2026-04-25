import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  ParseIntPipe,
} from '@nestjs/common';

import { SagasService } from './sagas.service';
import { CreateSagaDto } from './dtos/create-saga-dto';
import { UpdateSagaDto } from './dtos/update-saga-dto';
import { FilterSagaDto } from './dtos/filter-saga-dto';

@Controller('sagas')
export class SagasController {
  constructor(private readonly sagasService: SagasService) {}

  // CREATE
  @Post()
  create(@Body() dto: CreateSagaDto) {
    return this.sagasService.create(dto);
  }

  // LIST (com paginação)
  @Get()
  findAll(@Query() query: FilterSagaDto) {
    return this.sagasService.findAll(query);
  }

  // GET BY ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.sagasService.findOne(id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateSagaDto,
  ) {
    return this.sagasService.update(id, dto);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sagasService.remove(id);
  }
}