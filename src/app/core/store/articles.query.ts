import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ArticlesState, ArticlesStore } from './articles.store';

@Injectable({ providedIn: 'root' })
export class ArticlesQuery extends Query<ArticlesState> {
  constructor(protected override store: ArticlesStore) {
    super(store);
  }

  get articles$() {
    return this.select((state) => state.list);
  }

  get articles() {
    return this.getValue().list;
  }
}
