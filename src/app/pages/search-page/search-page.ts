import { ProfileCard } from '@/app/common-ui/profile-card/profile-card';
import { ProfileSearch } from '@/app/common-ui/profile-search/profile-search';
import { IProfile } from '@/app/data/services/profile/profile.interface';
import { Profile } from '@/app/data/services/profile/profile';
import { Component, inject, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-search-page',
  imports: [ProfileCard, ProfileSearch],
  templateUrl: './search-page.html',
  styleUrl: './search-page.scss',
})
export class SearchPage implements OnInit {
  profileService = inject(Profile);
  profiles = signal<IProfile[]>([]);

  ngOnInit(): void {
    this.profileService.getTestAccounts().subscribe((data) => {
      this.profiles.set(data);
    });
  }
}
