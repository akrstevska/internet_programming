import { Component } from '@angular/core';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-about',
  imports: [
    MatCard,
    MatCardContent,
    MatIcon,
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {
  student = {
    name: "Angela Krstevska",
    age: "21 years old",
    github: "https://github.com/Angela Krstevska",
    id: 5419,
    year:  new Date().getFullYear()
}
}
