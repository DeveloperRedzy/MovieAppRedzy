import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private searchService: SearchService) {}
  search = '';
  isSearching: boolean = false;
  async ngOnInit(): Promise<void> {
    this.searchService.search.subscribe((search) => (this.search = search));
    this.searchService.isSearching.subscribe((isSearching) => {
      this.isSearching = isSearching;
    });
  }

  onSearch(query: string): void {
    this.searchService.updateSearch(query);
  }
}
