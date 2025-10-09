import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';

@Component({
  selector: 'app-topic-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topic-select.component.html',
  styleUrls: ['./topic-select.component.scss']
})
export class TopicSelectComponent {
  selectedTopic: string | null = null;

  constructor(public quiz: QuizService, private router: Router) {}

  selectTopic(topic: string) {
    this.selectedTopic = topic;
  }

  startQuiz(limit: string) {
    const topic = this.selectedTopic!;
    this.quiz.fetchQuestions(topic, limit).subscribe((data) => {
      this.router.navigate(['/quiz'], {
        state: { topic: topic, questions: data },
      });
      this.selectedTopic = null; // reset after navigation
    });
  }

  cancel() {
    this.selectedTopic = null;
  }
}

