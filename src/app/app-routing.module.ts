import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { MoviesComponent } from './movies/movies.component';
import { SerieDetailsComponent } from './serie-details/serie-details.component';
import { SeriesComponent } from './series/series.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'movies', component: MoviesComponent },
      { path: 'series', component: SeriesComponent },
    ],
  },
  { path: 'movies/:id', component: MovieDetailsComponent },
  { path: 'series/:id', component: SerieDetailsComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
