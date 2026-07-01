import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  unreadMessagesCount = 10;
  followers = ['John Doe', 'Jane Smith', 'Alice Johnson'];
}
