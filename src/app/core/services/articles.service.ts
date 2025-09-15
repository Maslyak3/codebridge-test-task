import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class FetchAtriclesService {
  private API_URL = 'https://api.spaceflightnewsapi.net/v4/articles/?limit=100';

  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]> {
    return this.http.get<any>(this.API_URL).pipe(
      map(response => response.results)
    );
  }
  
}
