import { Routes } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { TopicSelectComponent } from './components/topic-select/topic-select.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { ResultComponent } from './components/result/result.component';

export const routes: Routes = [
  { path: '', component: LoadingComponent },
  { path: 'topics', component: TopicSelectComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: '**', redirectTo: '' },
];
