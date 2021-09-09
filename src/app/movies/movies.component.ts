import { Component, OnInit } from '@angular/core';
import { Movie, MoviesDataService } from '../movies-data.service';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  constructor(
    private moviesDataService: MoviesDataService,
    private searchService: SearchService
  ) {}
  movies: Movie[] = [];
  async ngOnInit(): Promise<void> {
    this.moviesDataService.data.subscribe((movies) => (this.movies = movies));
    this.searchService.search.subscribe(async (search) => {
      await this.moviesDataService.searchMovies(search);
    });
  }
}
