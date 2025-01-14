import { CommonModule } from '@angular/common';
import {Component, OnInit, AfterViewInit, ViewChild, signal} from '@angular/core';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatSortModule, MatSort, Sort } from '@angular/material/sort';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AuthorService } from '../../services/author.service';
import { Author } from '../../../models/author';
import {MatButton, MatMiniFabButton} from '@angular/material/button';
import {MatTooltip} from '@angular/material/tooltip';
import {MatIcon} from '@angular/material/icon';
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatCheckbox} from '@angular/material/checkbox';
import {RouterLink} from '@angular/router';
import {FormsModule} from '@angular/forms';
import Swal from 'sweetalert2';
import {SwalService} from '../../services/swal.service';

@Component({
  selector: 'app-author-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMiniFabButton,
    MatTooltip, MatIcon, MatAccordion, MatExpansionPanel, MatExpansionPanelTitle, MatExpansionPanelHeader, MatFormFieldModule, MatInput, MatSelect, MatCheckbox, RouterLink, MatOption, FormsModule, MatButton
  ],
  templateUrl: './author-list.component.html',
  styleUrl: './author-list.component.css'
})
export class AuthorListComponent implements OnInit, AfterViewInit {
  readonly panelOpenState = signal(false);
  displayedColumns = [
    'id',
    'name',
    'birth_date',
    'death_date',
    'alive',
    'nationality',
    'bibliography',
    'action',
  ];

  authors: Author[] = [];
  nationalities: string[] = [];
  dataSource = new MatTableDataSource<Author>([]);
  filterValues = {
    name: '',
    nationality: '',
    alive: null,
  };

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private authorsService: AuthorService, private _liveAnnouncer: LiveAnnouncer, private swalService: SwalService,) { }
  ngOnInit() {
    this.authorsService.getAuthors().subscribe(authors => {
      this.authors = authors;
      this.dataSource.data = authors;
      this.filterAuthors()
      console.log(this.dataSource);
    });
    this.authorsService.getNationalities().subscribe(nationalities => {
      this.nationalities = nationalities;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
  filterAuthors() {
    this.dataSource.filterPredicate = (data: Author, filter: string): boolean => {
      if (!filter) {
        return true;
      }
      const filterObject = JSON.parse(filter);
      const matchesName = filterObject.name ? data.name.toLowerCase().includes(filterObject.name.toLowerCase()) : true;
      const matchesNationality = filterObject.nationality ? data.nationality === filterObject.nationality : true;
      const matchesAlive = filterObject.alive !== null ? (filterObject.alive ? !data.death_date : !!data.death_date) : true;

      return matchesName && matchesNationality && matchesAlive;
    };

    this.dataSource.filter = JSON.stringify(this.filterValues);
  }


  resetFilter() {
    this.filterValues.alive = null;
    this.filterValues.nationality = '';
    this.filterValues.name = '';
    this.filterAuthors();

  }

  deleteAuthor(authorId: number) {
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
            this.dataSource.data = this.dataSource.data.filter(author => author.id !== authorId);
            this.filterAuthors();
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
