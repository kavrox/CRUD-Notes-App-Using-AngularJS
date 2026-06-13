import { Component, effect, inject } from '@angular/core';
import { NotesService } from '../notes-service';
import { NotesListInterface } from '../notes-list-interface';

@Component({
  selector: 'app-notes-list',
  imports: [],
  templateUrl: './notes-list.html',
  styleUrl: './notes-list.css',
})
export class NotesList {
  noteService = inject(NotesService);
  noteList = this.noteService.notesList;
  cat = 'General';
  
  constructor(){
    effect(
      () => {
        this.cat = this.noteService.catClicked();
      }
    )
  }

  noteClicked(note:NotesListInterface) {
    this.noteService.currentNote.set(note);
  }
  
}
