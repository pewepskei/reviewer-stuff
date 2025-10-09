import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  topicForm!: FormGroup;
  questionForm!: FormGroup;
  topics: any[] = [];
  loadingTopics = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.initForms();
    this.loadTopics();
  }

  initForms() {
    this.topicForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.questionForm = this.fb.group({
      topic: ['', Validators.required],
      question_text: ['', Validators.required],
      choice_a: ['', Validators.required],
      choice_b: ['', Validators.required],
      choice_c: ['', Validators.required],
      choice_d: ['', Validators.required],
      correct_answer: ['', Validators.required],
    });
  }

  loadTopics() {
    this.loadingTopics = true;
    this.http.get<any[]>('http://localhost:8000/api/topics/').subscribe({
      next: (data) => {
        this.topics = data;
        this.loadingTopics = false;
      },
      error: (err) => {
        console.error('Failed to load topics', err);
        this.loadingTopics = false;
      },
    });
  }

  addTopic() {
    if (this.topicForm.invalid) return;
    this.http.post('http://localhost:8000/api/topics/add/', this.topicForm.value).subscribe({
      next: () => {
        this.snackBar.open('✅ Topic added successfully!', 'Close', {
          duration: 2500,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.topicForm.reset();
        this.loadTopics();
      },
      error: () => {
        this.snackBar.open('❌ Failed to add topic.', 'Close', {
          duration: 2500,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }

  addQuestion() {
    if (this.questionForm.invalid) return;
    this.http.post('http://localhost:8000/api/questions/add/', this.questionForm.value).subscribe({
      next: () => {
        this.snackBar.open('✅ Question added successfully!', 'Close', {
          duration: 2500,
          panelClass: ['snackbar-success'],
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.questionForm.reset();
      },
      error: () => {
        this.snackBar.open('❌ Failed to add question.', 'Close', {
          duration: 2500,
          panelClass: ['snackbar-error'],
        });
      },
    });
  }
}

