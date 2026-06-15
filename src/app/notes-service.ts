import { Injectable, signal } from '@angular/core';
import { NotesListInterface } from './notes-list-interface';
import { single } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  createNewNote = signal(Symbol());
  catClicked = signal('General');
  updateCount = signal(Symbol())
  sameCurrentNote = signal(Symbol());

  CurrentNoteDetails = {
    noteId: '',
    title: '',
    type: '',
    notes: '',
    createdAt: '',
    lastModified: ''
  }

  currentNote = signal<NotesListInterface>(this.CurrentNoteDetails);

  notesList: NotesListInterface[] = [];

  addNote(title:string, type:string, notes:string){
    let new_note = {
      noteId : String(this.notesList.length),
      title : title,
      type : type,
      notes : notes,
      createdAt : new Date().toLocaleString(),
      lastModified : new Date().toLocaleString()
    }
    this.notesList.push(new_note); 
  }
  delNote(note_item : NotesListInterface){
    let ind = this.notesList.indexOf(note_item);
    if (ind > -1) {
      this.notesList.splice(ind,1);
    }
  }
  editNote(note_item : NotesListInterface, title: string, notes: string, type:string){
    console.log(this.notesList)
    console.log("inside edit note")
    for (let item of this.notesList){
      if (item.title === note_item.title) {
        console.log("item found")
        item.title = title;
        item.notes = notes;
        item.type = type;
        item.lastModified = new Date().toLocaleString();
        break;
      }
    }
    console.log(this.notesList)
  }
}
