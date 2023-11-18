import { Component, OnInit } from '@angular/core';
import { EntryService } from '../entry.service';
import { Store } from '@ngrx/store';
import * as EntryActions from './store/actions';
import { Observable } from 'rxjs';
import { selectAllEntries } from './store/selectors';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss'],
})
export class EntryComponent implements OnInit {
  entries$: Observable<any[]> = this.store.select(selectAllEntries);

  newEntry: any = {};
  selectedEntry: any = {};

  constructor(private entryService: EntryService, private store: Store) {}

  ngOnInit() {
    // Remove the following line, as entries$ is already initialized in the property declaration
    // this.entries$ = this.entryService.getAllEntries();
  }

  addEntry(): void {
    this.store.dispatch(EntryActions.createEntry({ entry: this.newEntry }));
    this.newEntry = {};
  }

  updateEntry(entry: any): void {
    this.selectedEntry = { ...entry };
  }

  saveUpdate(): void {
    this.store.dispatch(EntryActions.updateEntry({ entry: this.selectedEntry }));
    this.selectedEntry = {};
  }

  deleteEntry(idNumber: string): void {
    this.store.dispatch(EntryActions.deleteEntry({ idNumber }));
  }
}
