import { Component, effect, inject, signal } from '@angular/core';
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
  selectedNote = signal<NotesListInterface | null>(null);
  cat = 'General';
  
  catClick =
    effect(
      () => {
        this.cat = this.noteService.catClicked();
      }
    )
  
  noteClicked(note:NotesListInterface) {
    this.selectedNote.set(note);
    console.log(note.title + 'was clicked');
    if (note === this.noteService.currentNote()) {
      this.noteService.sameCurrentNote.set(Symbol());
    }
    this.noteService.currentNote.set(note);
  }
  
}
