import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { Article } from '../../core/models/article.model';
import { FetchArticlesService } from '../../core/services/articles.service';
import { MatCardModule } from '@angular/material/card';
import { SlicePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-article',
  standalone: true,
  imports: [MatCardModule,
  MatButtonModule,
  RouterLink],
  templateUrl: './article.html',
  styleUrl: './article.scss'
})

export class ArticleComponent implements OnInit {
  @Input() article!: Article;

  constructor(
        private articlesService: FetchArticlesService,
        private route: ActivatedRoute,) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articlesService.getArticleById(id).subscribe(data => {this.article = data});
    console.log(id)
  }

  
}
