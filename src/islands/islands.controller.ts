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
} from '@nestjs/common';

import { IslandsService } from './islands.service';

import { CreateIslandDto } from './dtos/create-island.dto';
import { UpdateIslandDto } from './dtos/update-island.dto';
import { FilterIslandDto } from './dtos/filter-island.dto';

@Controller('islands')
export class IslandsController {
  constructor(private readonly islandsService: IslandsService) {}

  // CREATE
  @Post()
  create(@Body() dto: CreateIslandDto) {
    return this.islandsService.create(dto);
  }

  // LIST
  @Get()
  findAll(@Query() query: FilterIslandDto) {
    return this.islandsService.findAll(query);
  }

  // DETAILS
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.islandsService.findDetails(id);
  }

  // UPDATE
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateIslandDto,
  ) {
    return this.islandsService.update(id, dto);
  }

  // DELETE (soft delete)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.islandsService.remove(id);
  }
}