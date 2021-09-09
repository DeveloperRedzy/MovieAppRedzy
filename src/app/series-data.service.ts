import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from './search.service';
import { SerieDetails } from './serie-details/serie-details.component';

export interface Serie {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface Series {
  page: number;
  results: Serie[];
  total_pages: number;
  total_results: number;
}

@Injectable({
  providedIn: 'root',
})
export class SeriesDataService {
  constructor(private http: HttpClient, private searchService: SearchService) {}
  private dataSource = new BehaviorSubject<Serie[]>([]);
  data = this.dataSource.asObservable();
  apiKey = '56159169510cfc95979022953b14fad7';

  changeData(res: Serie[]) {
    this.dataSource.next(res);
  }

  async getSeries() {
    this.searchService.updateIsSearching(true);
    const firstPage: Series = await this.http
      .get<Series>(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=1`
      )
      .toPromise();
    const secondPage: Series = await this.http
      .get<Series>(
        `https://api.themoviedb.org/3/tv/top_rated?api_key=${this.apiKey}&language=en-US&page=2`
      )
      .toPromise();
    this.changeData([...firstPage.results, ...secondPage.results.slice(10)]);
    this.searchService.updateIsSearching(false);
  }
  async searchSeries(query: string) {
    if (query.length > 2) {
      this.searchService.updateIsSearching(true);
      const series: Series = await this.http
        .get<Series>(
          `https://api.themoviedb.org/3/search/tv?api_key=${this.apiKey}&language=en-US&query=${query}&page=1&include_adult=false`
        )
        .toPromise();
      this.changeData([...series.results]);
      this.searchService.updateIsSearching(false);
    } else if (!query.length) this.getSeries();
  }
  async getSerieDetails(id: number) {
    const data: SerieDetails = await this.http
      .get<SerieDetails>(
        `https://api.themoviedb.org/3/tv/${id}?api_key=${this.apiKey}&language=en-US`
      )
      .toPromise();
    return data;
  }
}
