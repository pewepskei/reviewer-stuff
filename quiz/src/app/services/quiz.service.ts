import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuizService {
  private apiUrl = 'http://localhost:8000/api';
  topics$ = new BehaviorSubject<any[]>([]);
  questions$ = new BehaviorSubject<any[]>([]);
  currentTopic = '';
  score = 0;

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
    return this.http.get(`${this.apiUrl}/questions/?topic=${topic}&limit=${limit}`).pipe(
      map((res: any) => {
        res.forEach((q: any) => {
          q.choices = q.choices.sort(() => Math.random() - 0.5);
        });
        this.questions$.next(res);
        return res;
      })
    );
  }
}

