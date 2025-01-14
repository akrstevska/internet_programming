import { Routes } from '@angular/router';
import {AuthorListComponent} from './authors/author-list/author-list.component';
import {AboutComponent} from './about/about.component';
import {StatisticsComponent} from './statistics/statistics.component';
import {AuthorDetailsComponent} from './authors/author-details/author-details.component';
import {EditAuthorComponent} from './authors/edit-author/edit-author.component';
import {CreateAuthorComponent} from './authors/create-author/create-author.component';

export const routes: Routes = [
  { path: '', redirectTo: 'authors', pathMatch: 'full' },
  { path: 'authors', component: AuthorListComponent },
  { path: 'authors/create', component: CreateAuthorComponent },
  {path: 'authors/:id', component: AuthorDetailsComponent,},
  {path: 'authors/:id/edit', component: EditAuthorComponent},
  { path: 'about', component: AboutComponent },
  { path: 'statistics', component: StatisticsComponent },
  { path: '**', redirectTo: 'authors', pathMatch: 'full' },
];
