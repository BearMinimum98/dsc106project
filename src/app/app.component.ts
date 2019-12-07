import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'project'

  constructor() {}

  scrollToTimeline(): void {
    document.querySelector('#timeline').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"})
  }
}
