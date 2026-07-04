import { Profile } from '@/app/data/services/profile/profile';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout implements OnInit {
  profileService = inject(Profile);

  unreadMessagesCount = 10;
  followers = ['John Doe', 'Jane Smith', 'Alice Johnson'];
  activePage = 'profile';

  ngOnInit() {
    this.profileService.getMe().subscribe((data) => console.log(data));
  }
}
