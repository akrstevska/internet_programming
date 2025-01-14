import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCard, MatCardContent} from '@angular/material/card';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatButton} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthorService} from '../../services/author.service';
import {Router} from '@angular/router';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-create-author',
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
    NgIf
  ],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.css'
})
export class CreateAuthorComponent implements OnInit {
  authorForm: FormGroup;
  nationalities: string[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private authorService: AuthorService,
    private router: Router
  ) {
    this.authorForm = this.fb.group({
      name: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      birth_date: ['', [Validators.required, this.pastDateValidator()]],
      death_date: ['', [this.deathDateValidator()]]
    });
  }

  ngOnInit() {
    this.authorService.getNationalities().subscribe(nationalities => {
      this.nationalities = nationalities;
    });
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
    if (this.authorForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const formValue = this.authorForm.value;

      const authorData = {
        name: formValue.name,
        nationality: formValue.nationality,
        birth_date: this.formatDate(formValue.birth_date),
        death_date: this.formatDate(formValue.death_date),
        bibliography: []
      };

      this.authorService.createAuthor(authorData).subscribe({
        next: (savedAuthor) => {
          this.router.navigate(['/authors', savedAuthor.id]);
        },
        error: (error) => {
          console.error('Error creating author:', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
