import { Component, effect, model, OnInit, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FetchArticlesService } from '../../core/services/articles.service';
import { SlicePipe } from '@angular/common';
import { ArticleComponent } from '../article/article';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HighlightDirective } from '../../shared/highlight.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    SlicePipe,
    RouterModule,
    DatePipe,
    HighlightDirective,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  searchTerm = model<string>('');
  articlesList: any[] = [];
  keywords: string[] = [];

  constructor(private articlesService: FetchArticlesService, public router: Router) {
    effect(() => {
      const term = this.searchTerm();
      this.keywords = term.split(/\s+/).filter((k) => k.length > 0);
      if (this.keywords.length > 0) {
        this.searchArticles(this.keywords);
      } else {
        this.getFullListOfArticles();
      }
    });
  }

  ngOnInit() {
    this.getFullListOfArticles();
  }

  getFullListOfArticles() {
    this.articlesService.getArticles().subscribe((data) => {
      this.articlesList = data;
    });
  }

  searchArticles(keywords: string[]): void {
    forkJoin({
      byTitle: this.articlesService.getArticlesByKeyWordInTitle(keywords),
      bySummary: this.articlesService.getArticlesByKeyWordInSummary(keywords),
    }).subscribe(({ byTitle, bySummary }) => {
      const map = new Map<number, any>();

      byTitle?.forEach((article) => map.set(article.id, article));
      bySummary?.forEach((article) => {
        if (!map.has(article.id)) map.set(article.id, article);
      });
      if (Array.from(map.values()).length > 0) {
        this.articlesList = Array.from(map.values());
      } else {
        this.articlesList = [];
      }
      console.log(this.articlesList);
    });
  }
}
