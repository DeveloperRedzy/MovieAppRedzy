import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from './search.service';
import { MovieDetails } from './movie-details/movie-details.component';

export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface Movies {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesDataService {
  constructor(private http: HttpClient, private searchService: SearchService) {}
  private dataSource = new BehaviorSubject<Movie[]>([]);
  data = this.dataSource.asObservable();
  apiKey = '50c817a98f088ecfaaf8483ad5df9597';
  moviesUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=`;

  changeData(res: Movie[]) {
    this.dataSource.next(res);
  }

  async getMovies() {
    this.searchService.updateIsSearching(true);
    const firstPage: Movies = await this.http
      .get<Movies>(this.moviesUrl + '1')
      .toPromise();
    const secondPage: Movies = await this.http
      .get<Movies>(this.moviesUrl + '2')
      .toPromise();
    this.changeData([...firstPage.results, ...secondPage.results.slice(10)]);
    this.searchService.updateIsSearching(false);
  }
  async searchMovies(query: string) {
    if (query.length > 2) {
      this.searchService.updateIsSearching(true);
      const movies: Movies = await this.http
        .get<Movies>(
          `https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .toPromise();
      this.changeData([...movies.results]);
      this.searchService.updateIsSearching(false);
    } else if (!query.length) this.getMovies();
  }
  async getMovieDetails(id: number) {
    const data: MovieDetails = await this.http
      .get<MovieDetails>(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${this.apiKey}&language=en-US`
      )
      .toPromise();
    return data;
  }
}
