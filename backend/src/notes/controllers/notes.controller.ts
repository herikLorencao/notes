import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateOrUpdateNoteRequest } from '../requests/create-or-update-note.request';
import { ApiBearerAuth } from '@nestjs/swagger';
import { NotesMapper } from '../mapper/notes-mapper';

@Controller('notes')
export class NotesController {
  constructor(private readonly service: NotesService) {}

  @Get()
  @ApiBearerAuth()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  async findOne(@Param('id') id: number) {
    return await this.service.findOne(id);
  }

  @Post()
  @ApiBearerAuth()
  create(@Body() request: CreateOrUpdateNoteRequest) {
    const note = NotesMapper.mapToEntity(request);
    return this.service.create(note);
  }

  @Put(':id')
  @ApiBearerAuth()
  update(@Param('id') id: number, @Body() request: CreateOrUpdateNoteRequest) {
    const note = NotesMapper.mapToEntity(request);
    return this.service.update(id, note);
  }

  @Delete(':id')
  @ApiBearerAuth()
  remove(@Param('id') id: number) {
    return this.service.remove(id);
  }
}
