import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root',
})
export class FetchArticlesService {
  private API_URL = 'https://api.spaceflightnewsapi.net/v4/articles/';

  constructor(private http: HttpClient) {}

  getArticles(): Observable<Article[]> {
    return this.http
      .get<any>(`${this.API_URL}?$limit=100}`)
      .pipe(map((response) => response.results));
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.API_URL}${id}/`);
  }

  getArticlesByKeyWordInTitle(keywords: string[]) {
    const joined = keywords.join(',');
    return this.http
      .get<{ results: Article[] }>(`${this.API_URL}?title_contains_one=${joined}`)
      .pipe(map((response) => response?.results ?? []));
  }

  getArticlesByKeyWordInSummary(keywords: string[]) {
    const joined = keywords.join(',');
    return this.http
      .get<{ results: Article[] }>(`${this.API_URL}?summary_contains_one=${joined}`)
      .pipe(map((response) => response?.results ?? []));
  }
}
