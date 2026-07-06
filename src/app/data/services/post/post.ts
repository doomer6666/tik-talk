import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL } from '../services.const';
import { IPost } from './post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { Observable } from 'rxjs';
import { PatchPostDto } from './dto/patch-post.dto';

const POST_API_URL = `${BASE_API_URL}/post/`;

@Injectable({
  providedIn: 'root',
})
export class Post {
  private http = inject(HttpClient);

  getPostsById(id: number): Observable<IPost[]> {
    return this.http.get<IPost[]>(POST_API_URL, { params: { post_id: id } });
  }

  createPost(id: number, text: string): Observable<IPost> {
    const dto: CreatePostDto = {
      title: text,
      authorId: id,
      content: text,
      communityId: 0,
    };
    return this.http.post<IPost>(POST_API_URL, dto);
  }

  updatePost(id: number, payload: PatchPostDto): Observable<IPost> {
    return this.http.patch<IPost>(POST_API_URL, payload, { params: { post_id: id } });
  }

  deletePost(id: number): Observable<void> {
    return this.http.delete<void>(POST_API_URL, { params: { post_id: id } });
  }

  uploadImagePost(id: number, payload: string): Observable<IPost> {
    return this.http.post<IPost>(`${POST_API_URL}upload_image`, payload, {
      params: { post_id: id },
    });
  }

  deleteImagePost(id: number, imageUrl: string): Observable<void> {
    return this.http.delete<void>(`${POST_API_URL}upload_image`, {
      params: { post_id: id, image_url: imageUrl },
    });
  }

  likePost(id: number): Observable<string> {
    return this.http.post<string>(`${POST_API_URL}like/${id}`, {});
  }

  dislikePost(id: number): Observable<string> {
    return this.http.delete<string>(`${POST_API_URL}like/${id}`);
  }
}
