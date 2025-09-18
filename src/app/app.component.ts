import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class AppComponent {}
