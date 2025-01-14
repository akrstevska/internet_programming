import {Component, ViewChild} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {Author, Book} from '../../../models/author';
import {map, Subscription, switchMap} from 'rxjs';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthorService} from '../../services/author.service';
import {MatIcon} from '@angular/material/icon';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatNoDataRow, MatRow, MatRowDef,
  MatTable, MatTableDataSource
} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import Swal from 'sweetalert2';
import {SwalService} from '../../services/swal.service';

@Component({
  selector: 'app-author-details',
  imports: [
    MatCardModule,
    MatButton, MatIcon, MatTable, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatCell, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatPaginator, RouterLink, MatNoDataRow
  ],
  templateUrl: './author-details.component.html',
  styleUrl: './author-details.component.css'
})
export class AuthorDetailsComponent {
  author: Author | undefined;
  bibliography: Book[] | undefined;
  subscription?: Subscription;
  displayedColumns = [
    'name',
    'type',
    'year',
  ];
  dataSource = new MatTableDataSource<Book>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(private route: ActivatedRoute, private authorsService: AuthorService, private router: Router, private swalService: SwalService) { }

  ngOnInit() {
    this.subscription = this.route.params.pipe(
      map(params => Number(params['id'])),
      switchMap(authorId => this.authorsService.getAuthorById(authorId))
    ).subscribe(author => {
      this.author = author;
      this.bibliography = author.bibliography;
      this.dataSource.data = this.bibliography;
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  deleteAuthor(authorId: number | undefined) {
    if (!authorId) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid author ID. Unable to delete author.',
        icon: 'error',
        background: '#0F1414',
        color: '#efefef',
        confirmButtonColor: '#014F4F',
      });
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this author?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      background: '#0F1414',
      color: '#efefef',
      confirmButtonColor: '#014F4F',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authorsService.deleteAuthor(authorId).subscribe({
          next: () => {
            this.swalService.success('Author deleted successfully!');
            this.router.navigate(['/authors']);
          },
          error: (error) => {
            this.swalService.error('Failed to delete author');
            console.error('Delete error', error);
          },
        });
      }
    });
  }

}
