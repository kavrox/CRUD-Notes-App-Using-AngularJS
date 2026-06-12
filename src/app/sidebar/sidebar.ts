import { Component, output, inject } from '@angular/core';
import { NotesService } from '../notes-service';
@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  noteService = inject(NotesService);
  noteList = this.noteService.notesList;

  newNote(){
    //send a signal to display create new note
    this.noteService.createNewNote.set(Symbol());
  }
}
