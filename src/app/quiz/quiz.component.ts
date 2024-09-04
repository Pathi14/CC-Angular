import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { QuizService } from "../shared/services/quiz.service";
import { CategorieService } from '../shared/services/categorie.service';
@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  isQuizFinished = this.quizService.isQuizFinished;
  playerName = '';

  constructor(
    private quizService: QuizService,
    private router: Router,
    private route: ActivatedRoute,
    private categorieService: CategorieService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.quizService.playerName = params['playerName'];
      this.playerName = params['playerName'];
    });
    this.getCategories();
    this.getQuestionsByCategoryId('');
  }

  goToResultPage() {
    this.router.navigate(['/result']);
  }
  getCategories() {
    this.categorieService.getCategories().subscribe(data => {
      console.log("les categories",data);
    });
  }
  getQuestionsByCategoryId(categoryName: string) {
    this.categorieService. getQuestionsByCategory(categoryName).subscribe(data => {
      console.log("les questions", data);
    }, error => {
      console.error("Error fetching questions", error);
    });
  }
}
