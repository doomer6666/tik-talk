import { Component, inject, OnInit, signal } from '@angular/core';
import { ProfileCard } from './common-ui/profile-card/profile-card';
import { Profile } from './data/services/profile';
import { IProfile } from './data/services/interfaces/profile.interface';

@Component({
  selector: 'app-root',
  imports: [ProfileCard],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected readonly title = signal('tik-talk');
  profileService = inject(Profile);
  profiles = signal<IProfile[]>([]);
  ngOnInit(): void {
    this.profileService.getTestAccounts().subscribe((data) => {
      console.log('data', data);
      this.profiles.set(data);
    });
  }
}
