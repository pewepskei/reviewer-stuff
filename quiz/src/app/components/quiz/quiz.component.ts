import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('400ms ease-in', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class QuizComponent {
  topic: any;
  questions: any[] = [];
  currentIndex = 0;
  selected: string | null = null;
  isAnswered = false;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    const state = nav?.extras?.state as { topic: any; questions: any[] };
    if (state) {
      this.topic = state.topic;
      this.questions = state.questions;
    } else {
      // fallback: redirect if no state
      this.router.navigate(['/']);
    }
  }

  get currentQuestion() {
    return this.questions[this.currentIndex];
  }

  selectChoice(choice: string) {
    if (this.isAnswered) return;
    this.selected = choice;
    this.isAnswered = true;
  }

  nextQuestion() {
    if (!this.isAnswered) return;
    this.isAnswered = false;
    this.selected = null;
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
    } else {
      this.router.navigate(['/result']);
    }
  }

  isCorrect(choice: string): boolean {
    return this.isAnswered && choice === this.currentQuestion.correct_choice;
  }

  isWrong(choice: string): boolean {
    return this.isAnswered && this.selected === choice && choice !== this.currentQuestion.correct_choice;
  }
}

