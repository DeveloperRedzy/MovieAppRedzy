import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}
  private searchSource = new BehaviorSubject('');
  search = this.searchSource.asObservable();
  private isSearchingSource = new BehaviorSubject(false);
  isSearching = this.isSearchingSource.asObservable();

  updateSearch(res: string) {
    this.searchSource.next(res);
  }
  updateIsSearching(flag: boolean) {
    this.isSearchingSource.next(flag);
  }
}
