import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Sidebar } from "./sidebar/sidebar";
import { NotesList } from "./notes-list/notes-list";
import { NoteEditor } from "./note-editor/note-editor";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Sidebar, NotesList, NoteEditor],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('notes-app');
}
