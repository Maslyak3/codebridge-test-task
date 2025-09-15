import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FetchAtriclesService } from '../../core/services/articles.service';
import { SlicePipe } from '@angular/common';

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
    SlicePipe
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})


export class HomeComponent {
  
  articlesList: any[] = [];
  constructor(private articlesService: FetchAtriclesService) {
    this.articlesService.getArticles().subscribe(data => {this.articlesList = data});
  }
    
}
