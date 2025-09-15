import { Routes } from '@angular/router';
import { ArticleComponent } from './pages/article/article';
import { HomeComponent } from './pages/home/home';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'article/:id', component: ArticleComponent},
    {path: '**', redirectTo: ''}
];
