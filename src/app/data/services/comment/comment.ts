import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Observable } from 'rxjs';
import { IComment } from './comment.interface';
import { BASE_API_URL } from '../services.const';

const COMMENT_API_URL = `${BASE_API_URL}/comment/`;

@Injectable({
  providedIn: 'root',
})
export class Comment {
  private http = inject(HttpClient);

  createComment(authorId: number, postId: number, text: string): Observable<IComment> {
    const dto: CreateCommentDto = {
      authorId,
      postId,
      text,
      commentId: 0,
    };
    return this.http.post<IComment>(COMMENT_API_URL, dto);
  }

  getComment(id: number): Observable<IComment> {
    return this.http.get<IComment>(COMMENT_API_URL, { params: { comment_id: id } });
  }

  patchComment(id: number, payload: { text: string }): Observable<IComment> {
    return this.http.patch<IComment>(COMMENT_API_URL, payload, { params: { comment_id: id } });
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(COMMENT_API_URL, { params: { comment_id: id } });
  }
}
