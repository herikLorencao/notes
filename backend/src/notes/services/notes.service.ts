import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entities/note.entity';
import { Repository } from 'typeorm';
import { NotesMapper } from '../mapper/notes-mapper';

@Injectable()
export class NotesService {
  constructor(@InjectRepository(Note) private repository: Repository<Note>) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const note = await this.repository.findOneBy({ id });
    if (!note) throw new NotFoundException('Nota nao encontrada');
    return note;
  }

  async create(note: Note) {
    const createdNote = await this.repository.save(note);
    return NotesMapper.mapToResponse(createdNote);
  }

  async update(id: number, note: Note) {
    await this.findOne(id);
    const result = await this.repository.update(id, note);

    if (!result.affected)
      throw new UnprocessableEntityException('Atualizacao nao realizada');

    return NotesMapper.mapToResponse(note);
  }

  async remove(id: number) {
    await this.findOne(id);
    const result = await this.repository.delete(id);

    if (!result.affected)
      throw new UnprocessableEntityException('Remocao nao realizada');
  }
}
