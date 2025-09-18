import { Injectable } from '@angular/core';
import { EntityStore, Store, StoreConfig } from '@datorama/akita';
import { Article } from '../models/article.model';

export interface ArticlesState {
  list: Article[];
}

export const createInitialState = (): ArticlesState => ({
  list: [],
});

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'articles' })
export class ArticlesStore extends Store<ArticlesState> {
  constructor() {
    super(createInitialState());
  }
}
