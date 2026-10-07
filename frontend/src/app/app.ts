import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';


@Component({
  imports: [Navbar, RouterOutlet],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('student-management');
  imageUrl = signal('https://placehold.co/300x200');

  changeTitle() {
    this.title.set('My Students');
  }
}