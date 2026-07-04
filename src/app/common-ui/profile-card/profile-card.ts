import { IProfile } from '@/app/data/services/profile/profile.interface';
import { ImgUrlPipe } from '@/app/helpers/pipes/img-url-pipe';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profile-card',
  imports: [ImgUrlPipe],
  templateUrl: './profile-card.html',
  styleUrl: './profile-card.scss',
})
export class ProfileCard {
  @Input() profile!: IProfile;
}
