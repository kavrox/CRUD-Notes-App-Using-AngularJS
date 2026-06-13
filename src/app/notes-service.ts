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

  OBJ = {
      noteId: 'QWERTY',
      title: 'Angular Services',
      type: 'Work',
      notes: '',
      createdAt: '2025-06-10T09:00:00Z',
      lastModified: '2025-06-10T11:30:00Z'
  }
  currentNote = signal<NotesListInterface>(this.OBJ);

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
    note_item.title = title;
    note_item.notes = notes;
    note_item.type = type;
    note_item.lastModified = new Date().toLocaleString();
  }
}
