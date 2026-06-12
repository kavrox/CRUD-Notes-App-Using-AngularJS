import { Component, inject, effect} from '@angular/core';
import { NotesService } from '../notes-service';

@Component({
  selector: 'app-note-editor',
  imports: [],
  templateUrl: './note-editor.html',
  styleUrl: './note-editor.css',
})
export class NoteEditor {
  dispForm = false;

  noteService = inject(NotesService);
  noteList = this.noteService.notesList;

  createNoteEffect = effect(
    () => {
      this.noteService.createNewNote
    } 
  )
}
