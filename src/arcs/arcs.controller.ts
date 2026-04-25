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

import { ArcsService } from './arcs.service';
import { CreateArcDto } from './dtos/create-arcs-dto';
import { UpdateArcDto } from './dtos/update-arcs-dto';
import { FilterArcDto } from './dtos/filter-arcs-dto';

@Controller('arcs')
export class ArcsController {
  constructor(private readonly arcsService: ArcsService) {}

  @Post()
  create(@Body() dto: CreateArcDto) {
    return this.arcsService.create(dto);
  }

  @Get()
  findAll(@Query() query: FilterArcDto) {
    return this.arcsService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.arcsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateArcDto,
  ) {
    return this.arcsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.arcsService.remove(id);
  }
}