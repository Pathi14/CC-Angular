import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { CategorieService } from 'src/app/shared/services/categorie.service';


@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent {
  playerName = '';
  
  cats: string[]= [];
  selectedCategory = '';

  constructor(private router: Router, private authService: AuthService, private categorieService: CategorieService  ) { }

  ngOnInit(): void {
    this.authService.isUserConnected();
    this.playerName = this.authService.user?.username || '';
    this.getCategories();
    this.getQuestionsByCategoryId('CSS')
  }

  navigateToQuiz( ) {
  
    this.router.navigate(['/quiz/:', this.playerName]);
  }
  

  getCategories(): void {
    this.categorieService.getCategories().subscribe(data => {
      this.cats = data.map((category: any) => category.categorieName);
      console.log("les categories", this.cats);
    });
  }

  getQuestionsByCategoryId(categoryName: string) {
    this.categorieService.getQuestionsByCategory (categoryName).subscribe(data => {
      console.log("les questions "+categoryName, data);
    }, error => {
      console.error("Error fetching questions", error);
    });
  }
}
