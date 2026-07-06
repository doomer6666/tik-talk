import { IComment } from '../comment/comment.interface';
import { IProfile } from '../profile/profile.interface';

export interface IPost {
  id: number;
  title: string;
  communityId: number;
  content: string;
  author: IProfile;
  images: string[];
  createdAt: string;
  updatedAt: string;
  likes: number;
  likesUsers: number[];
  comments: IComment[];
}
