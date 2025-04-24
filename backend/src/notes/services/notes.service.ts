import {
  Inject,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Note } from '../entities/note.entity';
import { Repository } from 'typeorm';
import { NotesMapper } from '../mapper/notes-mapper';
import { SonicGateway } from '../gateways/sonic.gateway';

@Injectable()
export class NotesService {
  private readonly NOTES_COLLECTION = 'notes';
  private readonly NOTES_BUCKET = 'default';

  constructor(
    @InjectRepository(Note) private repository: Repository<Note>,
    @Inject() private sonicGateway: SonicGateway,
  ) {}

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const note = await this.repository.findOneBy({ id });
    if (!note) throw new NotFoundException('Nota não encontrada');
    return note;
  }

  async create(note: Note) {
    const createdNote = await this.repository.save(note);
    await this.insertInSonic(createdNote);
    return NotesMapper.mapToResponse(createdNote);
  }

  async update(id: number, note: Note) {
    const outdatedNote = await this.findOne(id);
    await this.removeInSonic(outdatedNote);
    const result = await this.repository.update(id, note);
    await this.insertInSonic(note);

    if (!result.affected)
      throw new UnprocessableEntityException('Atualização não realizada');

    return NotesMapper.mapToResponse(note);
  }

  async remove(id: number) {
    const note = await this.findOne(id);
    await this.removeInSonic(note);

    const result = await this.repository.delete(id);

    if (!result.affected)
      throw new UnprocessableEntityException('Remoção não realizada');
  }

  async search(query: string) {
    return await this.sonicGateway.search(
      query,
      this.NOTES_COLLECTION,
      this.NOTES_BUCKET,
    );
  }

  async suggest(query: string) {
    return await this.sonicGateway.suggest(
      query,
      this.NOTES_COLLECTION,
      this.NOTES_BUCKET,
    );
  }

  private async insertInSonic(note: Note) {
    const noteContent = `${note.title} ${note.content}`;

    return await this.sonicGateway.insert(
      this.NOTES_COLLECTION,
      this.NOTES_BUCKET,
      note.title,
      noteContent,
    );
  }

  private async removeInSonic(note: Note) {
    const noteContent = `${note.title} ${note.content}`;

    return await this.sonicGateway.remove(
      this.NOTES_COLLECTION,
      this.NOTES_BUCKET,
      note.title,
      noteContent,
    );
  }
}
