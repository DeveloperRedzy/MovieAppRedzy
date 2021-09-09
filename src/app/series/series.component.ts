import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { SeriesDataService, Serie } from '../series-data.service';

@Component({
  selector: 'app-series',
  templateUrl: './series.component.html',
  styleUrls: ['./series.component.css'],
})
export class SeriesComponent implements OnInit {
  constructor(
    private seriesDataService: SeriesDataService,
    private searchService: SearchService
  ) {}

  series: Serie[] = [];
  async ngOnInit(): Promise<void> {
    this.seriesDataService.data.subscribe((series) => (this.series = series));
    this.searchService.search.subscribe(async (search) => {
      await this.seriesDataService.searchSeries(search);
    });
  }
}
