import { IProfile } from '../profile/profile.interface';

export interface IComment {
  id: number;
  text: string;
  author: IProfile;
  postId: number;
  commentId: number;
  createdAt: string;
  updatedAt: string;
}
