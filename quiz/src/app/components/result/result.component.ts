import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  topic = '';
  score = 0;
  total = 0;

  constructor(public quiz: QuizService, private router: Router) {
    this.topic = quiz.currentTopic;
    this.score = quiz.score;
    this.total = quiz.totalQuestions;
  }

  restart() {
    this.quiz.score = 0;
    this.router.navigate(['/topics']);
  }
}

