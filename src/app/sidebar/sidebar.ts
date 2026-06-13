import { Component, output, inject, effect } from '@angular/core';
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
  gC = 0;
  pC = 0;
  wC = 0;
  iC = 0; 
  constructor(){
    this.updateCounts();
  }

  updatecountEffect = effect(
    () => {
      let x = this.noteService.updateCount()
      this.updateCounts();
    }
  )
  updateCounts(){
    this.gC = 0; this.wC = 0; this.pC = 0; this.iC = 0;
    for (let item of this.noteList) {
      if (item.type==="General") {
        this.gC++;
      } else if (item.type==="Personal") {
        this.pC++;
      } else if (item.type==="Work") {
        this.wC++;
      } else {
        this.iC++;
      }
    }
  }

  newNote(){
    //send a signal to display create new note
    this.noteService.createNewNote.set(Symbol());
    console.log("new note btn was clicked")
  }

  catClicked(type:string){
    this.noteService.catClicked.set(type)
    console.log(type+' was clicked')
  }
}
