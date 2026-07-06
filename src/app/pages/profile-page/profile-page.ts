import { Comment, CreateCommentDto } from '@/app/data/services/comment/index';
import { IPost, Post } from '@/app/data/services/post/index';
import { IProfile, Profile } from '@/app/data/services/profile/index';
import { ImgUrlPipe } from '@/app/helpers/pipes/img-url-pipe';
import { TimeFormatPipe } from '@/app/helpers/pipes/time-format-pipe';
import { Component, inject, OnInit, signal } from '@angular/core';
import { switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  imports: [ImgUrlPipe, TimeFormatPipe],
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.scss',
})
export class ProfilePage implements OnInit {
  private profileService = inject(Profile);
  private postsService = inject(Post);
  private commentService = inject(Comment);

  profile = signal<IProfile | null>(null);
  subscribers = signal<IProfile[]>([]);
  posts = signal<IPost[]>([]);

  openPostCommentsId = signal<number | null>(null);

  isPostLoading = signal(false);
  isCommentLoading = signal(false);

  ngOnInit() {
    this.profileService
      .getMe()
      .pipe(
        tap((profileData) => this.profile.set(profileData)),
        switchMap((profileData) => this.postsService.getPostsById(profileData.id)),
      )
      .subscribe((postsData) => {
        this.posts.set(postsData);
      });

    this.profileService.getSubscribers().subscribe((subs) => this.subscribers.set(subs));
  }

  onCommentClick(id: number) {
    if (this.openPostCommentsId() == id) this.openPostCommentsId.set(null);
    else this.openPostCommentsId.set(id);
  }

  createPost(input: HTMLInputElement) {
    this.postsService
      .createPost(this.profile()!.id, input.value)
      .subscribe((post) => this.posts.update((posts) => [...posts, post]));
    input.value = '';
  }

  sendComment(input: HTMLInputElement, postId: number, authorId: number) {
    this.isCommentLoading.set(true);
    this.commentService.createComment(authorId, postId, input.value).subscribe({
      next: (comment) => {
        this.posts.update((posts) => {
          return posts.map((post) => {
            if (post.id === postId) {
              return { ...post, comments: [...(post.comments || []), comment] };
            }
            return post;
          });
        });
      },
    });
    input.value = '';
    this.isCommentLoading.set(false);
  }

  onLike(post: IPost) {
    this.isLikedByMe(post)
      ? this.postsService.dislikePost(post.id).subscribe()
      : this.postsService.likePost(post.id).subscribe();
  }

  isLikedByMe(post: IPost): boolean {
    const myId = this.profile()?.id;
    if (!myId) return false;
    return post.likesUsers.some((userId) => userId === myId);
  }
}
