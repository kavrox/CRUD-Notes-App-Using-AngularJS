import { Component, inject, effect, OnInit } from '@angular/core';
import { NotesService } from '../notes-service';
import { NotesListInterface } from '../notes-list-interface';
import { last } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  noteService = inject(NotesService);
  noteList: NotesListInterface[] = this.noteService.notesList;
  noteListFiltered: NotesListInterface[] = this.noteService.filteredList();
  lastInputValue = '';
  init = true;
  theme: 'light' | 'dark' = 'light';

  ngOnInit() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
      this.theme = 'dark';
    }

    this.applyTheme(this.theme);
  }

  searchEvent(searchString: string) {
    this.lastInputValue = searchString;
    console.log('search event triggered: ' + searchString);
    console.log(this.noteService.filteredList());
    this.noteService.filteredList.set(
      this.noteList.filter((item) =>
        item.title.toLowerCase().includes(searchString.toLowerCase())
      )
    );
    console.log(this.noteService.filteredList());
    console.log(this.noteList);
  }

  toggleTheme(theme: string) {
    const nextTheme = theme === 'dark' ? 'dark' : 'light';
    this.theme = nextTheme;
    this.applyTheme(nextTheme);
    localStorage.setItem('theme', nextTheme);
  }

  private applyTheme(theme: 'light' | 'dark') {
    document.documentElement.classList.toggle('dark-theme', theme === 'dark');
  }

  test = effect(() => {
    this.noteService.updateFilterList();
    if (this.init) {
      this.init = false;
    } else {
      this.noteService.filteredList.set(
        this.noteList.filter((item) =>
          item.title.toLowerCase().includes(this.lastInputValue.toLowerCase())
        )
      );
      console.log('CHANGE RECORDED' + this.noteService.filteredList());
    }
  });
}
