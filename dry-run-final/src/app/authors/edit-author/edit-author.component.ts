import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton, MatIconButton, MatMiniFabButton} from '@angular/material/button';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthorService} from '../../services/author.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {BookType} from '../../../models/author';
import {MatTooltip} from '@angular/material/tooltip';


@Component({
  selector: 'app-edit-author',
  imports: [
    MatFormFieldModule,
    MatInput,
    MatSelect,
    MatOption,
    MatCard,
    MatCardContent,
    MatDatepickerModule,
    MatButton,
    ReactiveFormsModule,
    NgIf,
    MatIconButton,
    MatIcon,
    MatMiniFabButton,
    MatTooltip
  ],
  templateUrl: './edit-author.component.html',
  styleUrl: './edit-author.component.css'
})
export class EditAuthorComponent implements OnInit {
  authorForm: FormGroup;
  nationalities: string[] = [];
  bookTypes: BookType[] = [];
  authorId: number | undefined;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      birth_date: ['', [Validators.required, this.pastDateValidator()]],
      death_date: ['', [this.deathDateValidator()]],
      bibliography: this.fb.array([])
    });
  }

  ngOnInit() {
    this.authorService.getNationalities().subscribe(nationalities => {
      this.nationalities = nationalities;
    });

    this.authorService.getBookTypes().subscribe(book_types => {
      this.bookTypes = book_types;
    });

    this.authorId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.authorId) {
      this.authorService.getAuthorById(this.authorId).subscribe(author => {
        this.authorForm.patchValue({
          name: author.name,
          nationality: author.nationality,
          birth_date: author.birth_date,
          death_date: author.death_date
        });

        const bibliography = this.authorForm.get('bibliography') as FormArray;
        bibliography.clear(); // Clear existing books

        author.bibliography.forEach(book => {
          bibliography.push(this.createBookForm(book));
        });
      });
    }
  }

  get bibliography() {
    return this.authorForm.get('bibliography') as FormArray;
  }

  private createBookForm(book: any = {}) {
    return this.fb.group({
      name: [book.name || '', [Validators.required]],
      year: [book.year || '', [Validators.required, Validators.min(1000), Validators.max(new Date().getFullYear())]],
      type: [book.type || '', [Validators.required]]
    });
  }

  addBook() {
    this.bibliography.push(this.createBookForm());
  }

  removeBook(index: number) {
    this.bibliography.removeAt(index);
  }
  pastDateValidator() {
    return (control: any) => {
      const date = new Date(control.value);
      const today = new Date();
      return date > today ? { futureDate: true } : null;
    };
  }

  deathDateValidator() {
    return (control: any) => {
      if (!control.value) return null;

      const deathDate = new Date(control.value);
      const birthDate = new Date(this.authorForm.get('birth_date')?.value);
      const today = new Date();

      if (deathDate > today) {
        return { futureDate: true };
      }
      if (deathDate < birthDate) {
        return { beforeBirth: true };
      }
      return null;
    };
  }

  formatDate(date: string | null): string | null {
    if (!date) return null;
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  onSubmit() {
    if (this.authorForm.valid && !this.isSubmitting && this.authorId) {
      this.isSubmitting = true;

      const formValue = this.authorForm.value;

      const authorData = {
        ...formValue,
        birth_date: this.formatDate(formValue.birth_date),
        death_date: this.formatDate(formValue.death_date),
        id: this.authorId
      };

      const request = this.authorService.updateAuthor(this.authorId, authorData);

      request.subscribe({
        next: (savedAuthor) => {
          this.router.navigate(['/authors', savedAuthor.id]);
        },
        error: (error) => {
          console.error('Error saving author:', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
