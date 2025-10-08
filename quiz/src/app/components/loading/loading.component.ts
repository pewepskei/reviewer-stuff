import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  constructor(private quiz: QuizService, private router: Router) {}

  ngOnInit() {
    this.quiz.fetchTopics().subscribe(() => {
      setTimeout(() => this.router.navigate(['/topics']), 800);
    });
  }
}

