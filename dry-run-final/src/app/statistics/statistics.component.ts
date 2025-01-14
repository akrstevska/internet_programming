import { Component, OnInit } from '@angular/core';
import { MatCard, MatCardContent } from "@angular/material/card";
import { ReactiveFormsModule } from "@angular/forms";
import { AuthorService } from '../services/author.service';
import { Author, BookType } from '../../models/author';
import {DecimalPipe, KeyValuePipe, NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-statistics',
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    DecimalPipe,
    KeyValuePipe,
    NgForOf,
    NgIf
  ],
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  authors: Author[] = [];
  nationalities: string[] = [];
  bookTypes: BookType[] = [];
  totalAuthors = 0;
  totalBooks = 0;
  averageBooksPerAuthor = 0;
  totalNationalities = 0;
  totalBookTypes = 0;
  totalBooksByNationality = new Map<string, number>();
  totalBooksByType = new Map<string, number>();
  constructor(private authorsService: AuthorService) { }

  ngOnInit() {
    this.authorsService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.updateStatistics();
    });
    this.authorsService.getNationalities().subscribe(nationalities => {
      this.nationalities = nationalities;
      this.updateStatistics();
    });
    this.authorsService.getBookTypes().subscribe(bookTypes => {
      this.bookTypes = bookTypes;
      this.updateStatistics();
    });
  }

  updateStatistics() {
    this.calculateTotalAuthors();
    this.calculateTotalBooks();
    this.calculateAverageBooksPerAuthor();
    this.calculateTotalNationalities();
    this.calculateTotalBookTypes();
    this.calculateBooksByNationality();
    this.calculateBooksByType();
  }

  calculateTotalAuthors() {
    this.totalAuthors = this.authors.length;
  }

  calculateTotalBooks() {
    this.totalBooks = this.authors.reduce((sum, author) => sum + author.bibliography.length, 0);
  }

  calculateAverageBooksPerAuthor() {
    this.averageBooksPerAuthor = this.totalAuthors ? this.totalBooks / this.totalAuthors : 0;
  }

  calculateTotalNationalities() {
    this.totalNationalities = this.nationalities.length;
  }

  calculateTotalBookTypes() {
    this.totalBookTypes = this.bookTypes.length;
  }

  calculateBooksByNationality() {
    const nationalityCounts = new Map<string, number>();

    this.authors.forEach(author => {
      const authorNationalities = author.nationality.split('-');
      authorNationalities.forEach(nationality => {
        const currentCount = nationalityCounts.get(nationality) || 0;
        nationalityCounts.set(nationality, currentCount + author.bibliography.length);
      });
    });

    this.totalBooksByNationality = nationalityCounts;
  }
  calculateBooksByType() {
    const typeCounts = new Map<string, number>();

    this.authors.forEach(author => {
      author.bibliography.forEach(book => {
        const currentCount = typeCounts.get(book.type) || 0;
        typeCounts.set(book.type, currentCount + 1);
      });
    });

    this.totalBooksByType = typeCounts;
  }

}
