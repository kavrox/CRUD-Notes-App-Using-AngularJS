import { Injectable, signal } from '@angular/core';
import { NotesListInterface } from './notes-list-interface';
import { single } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  createNewNote = signal(Symbol());

  notesList: NotesListInterface[] = [{
      noteId: '1',
      title: 'Angular Services',
      type: 'Work',
      notes: 'Learn how services and dependency injection work in Angular.',
      createdAt: '2025-06-10T09:00:00Z',
      lastModified: '2025-06-10T11:30:00Z'
    },
    {
      noteId: '2',
      title: 'Grocery List',
      type: 'Personal',
      notes: 'Milk, Eggs, Bread, Coffee, Fruits',
      createdAt: '2025-06-11T07:15:00Z',
      lastModified: '2025-06-11T07:20:00Z'
    }];

  addNote(title:string, type:string, notes:string){
    let new_note = {
      noteId : this.notesList.length,
      title : title,
      type : type,
      notes : notes,
      createdAt : new Date().toLocaleString(),
      lastModified : new Date().toLocaleString()
    } 
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
