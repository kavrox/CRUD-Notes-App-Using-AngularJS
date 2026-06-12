import { Injectable } from '@angular/core';
import { NotesListInterface } from './notes-list-interface';

@Injectable({
  providedIn: 'root',
})
export class NotesService {

  notesList: NotesListInterface[] = [];

  addNote() {}
  editNote() {}
  deleteNote() {}
  

  // Add methods to manage notes here
}
