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
  count = 0;
  dt = new Date().toLocaleString();
  noteService = inject(NotesService);
  noteList = this.noteService.notesList;

  createNoteEffect = effect(
    () => {
      this.noteService.createNewNote(); console.log("add btn was clicked")
      if (this.count != 0) {
        this.dispForm = true;
      }
      this.count += 1;
    } 
  )

  cancelNote(){
    this.dispForm = false;
  }

  deleteNote(){

  }

  saveNote(){
    
  }
}
