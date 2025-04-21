import { Note } from '../note.entity';
import { CreateOrUpdateNoteRequest } from '../requests/create-or-update-note.request';
import { NoteResponse } from '../responses/note.response';

export class NotesMapper {
  static mapToEntity(request: CreateOrUpdateNoteRequest) {
    const note = new Note();

    note.title = request.title;
    note.content = request.content;

    return note;
  }

  static mapToResponse(note: Note) {
    const response = new NoteResponse();

    response.title = note.title;
    response.content = note.content;
    response.createdAt = note.createdAt;
    response.updatedAt = note.updatedAt;

    return response;
  }
}
