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
  constructor(public quiz: QuizService, private router: Router) {}

  selectTopic(topic: string) {
    const limit = prompt('How many questions? (50, 100, or unli)', '50') || '50';

    this.quiz.fetchQuestions(topic, limit).subscribe((data) => {
      // ✅ 'data' is the response from your service
      this.router.navigate(['/quiz'], {
        state: { topic: topic, questions: data }
      });
    });
  }
}
