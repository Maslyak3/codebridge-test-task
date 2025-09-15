import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'article/:id', component: ArticleComponent},
    {path: '**', redirectTo: ''}
];
