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
import { finalize, forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';
import { HighlightDirective } from '../../shared/highlight.directive';
import { ArticlesStore } from '../../core/store/articles.store';
import { ArticlesQuery } from '../../core/store/articles.query';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class HomeComponent implements OnInit {
  searchTerm = model<string>('');
  articlesList: any[] = [];
  keywords: string[] = [];
  loading = false;

  constructor(
    private articlesService: FetchArticlesService,
    public router: Router,
    private articlesStore: ArticlesStore,
    private articlesQuery: ArticlesQuery
  ) {
    effect(() => {
      const term = this.searchTerm();
      this.keywords = term.split(/\s+/).filter((k) => k.length > 0);
    });
  }

  ngOnInit() {
    this.articlesService.getArticles().subscribe((data) => {
      this.articlesStore.update({ list: data });
      this.articlesList = data;
    });
  }

  renderFullListOfArticles() {
    this.articlesList = this.articlesStore.getValue().list;
    this.searchTerm.set('');
    this.keywords = [];
  }

  searchArticles(): void {
    const keywords = this.keywords;

    if (this.keywords.length === 0) {
      this.renderFullListOfArticles();
      return;
    }
    this.loading = true;
    forkJoin({
      byTitle: this.articlesService.getArticlesByKeyWordInTitle(keywords),
      bySummary: this.articlesService.getArticlesByKeyWordInSummary(keywords),
    })
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(({ byTitle, bySummary }) => {
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
      });
  }
}
