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

  CurrentNoteDetails = {
    noteId: '',
    title: '',
    type: '',
    notes: '',
    createdAt: '',
    lastModified: ''
  }

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
      let curObj = this.noteService.currentNote();
      this.dispForm=false;
      this.CurrentNoteDetails.title = curObj.title;
      this.CurrentNoteDetails.type = curObj.type;
      this.CurrentNoteDetails.notes = curObj.notes;
      this.CurrentNoteDetails.createdAt = curObj.createdAt;
      this.CurrentNoteDetails.lastModified = curObj.lastModified;
      if (this.initialized==false){ 
        this.initialized=true;
      } else {
        this.dispNote=true;
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
    this.noteService.editNote(item,title,note,type)
    this.dispForm=false;
  }
}
