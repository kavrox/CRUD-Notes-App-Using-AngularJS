import { Component, inject, effect} from '@angular/core';
import { NotesService } from '../notes-service';
import { NotesListInterface } from '../notes-list-interface';

@Component({
  selector: 'app-note-editor',
  imports: [],
  templateUrl: './note-editor.html',
  styleUrl: './note-editor.css',
})
export class NoteEditor {
  dispForm = false;
  dispNote = false;
  initialized = false;
  count = 0;
  dt = new Date().toLocaleString();
  noteService = inject(NotesService);
  noteList = this.noteService.notesList;
  curObj = this.noteService.currentNote();

  createNoteEffect = effect(
    () => {
      this.noteService.createNewNote(); 
      console.log("form is now displayed");
      if (this.count != 0) {
        this.dispForm = true;
      }
      this.count += 1;
    } 
  )

  currentNoteClickEffect = effect(
    () => {
      this.curObj = this.noteService.currentNote();
      this.noteService.sameCurrentNote();
      if (this.initialized === false) {
        // first run
        this.dispNote = false
        this.dispForm = false
        this.initialized = true;
      } else {
        // not the first run
        console.log('inside else block of current note click effect')
        this.dispNote=true;
        this.dispForm=false;
      }
      
    }
  )

  cancelNote(){
    this.dispForm = false;
    this.dispNote = false;
  }

  deleteNote(){
    this.noteService.delNote(this.noteService.currentNote());
    this.dispNote = false;
    this.noteService.updateCount.set(Symbol());
  }

  addNote(title:string, note:string, type:string) {
    console.log(title);
    console.log(type);
    console.log(note);
    console.log(this.noteService.notesList);
    this.noteService.addNote(title,type,note)
    this.dispForm=false;
    console.log(this.noteService.notesList);
    this.noteService.updateCount.set(Symbol());
    console.log("Note added successfully");
  }

  saveNote(item: NotesListInterface, title:string, note:string, type:string){
    console.log(item);
    this.noteService.editNote(item,title,note,type)
    this.noteService.updateCount.set(Symbol());
    this.dispNote=false;
    this.dispForm=false;
  }
}
