import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private apiUrl = 'http://localhost:8000/api';
  topics$ = new BehaviorSubject<any[]>([]);
  questions$ = new BehaviorSubject<any[]>([]);

  // shared session state
  currentTopic = '';
  score = 0;
  totalQuestions = 0;

  constructor(private http: HttpClient) {}

  fetchTopics() {
    return this.http.get(`${this.apiUrl}/topics/`).pipe(
      map((res: any) => {
        this.topics$.next(res);
        return res;
      })
    );
  }

  fetchQuestions(topic: string, limit: string) {
    this.currentTopic = topic;
    // reset score here for a fresh session
    this.score = 0;
    return this.http
      .get(`${this.apiUrl}/questions/?topic=${topic}&limit=${limit}`)
      .pipe(
        map((res: any) => {
          // ensure choices exist and randomize order for frontend
          res.forEach((q: any) => {
            q.choices = q.choices || [];
            q.choices = q.choices.sort(() => Math.random() - 0.5);
          });
          this.questions$.next(res);
          this.totalQuestions = Array.isArray(res) ? res.length : 0;
          return res;
        })
      );
  }
}

