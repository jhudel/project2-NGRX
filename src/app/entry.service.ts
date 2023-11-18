import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { take, mergeMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EntryService {
  private entries: any[] = [];
  private entriesSubject = new BehaviorSubject<any[]>([]);

  getAllEntries(): Observable<any[]> {
    return this.entriesSubject.asObservable();
  }

  updateEntry(updatedEntry: any, entries: any[]): Observable<void> {
    const isDuplicate = entries.some((e) => e.idNumber === updatedEntry.idNumber);

    if (isDuplicate) {
      console.error('Duplicate entry detected!');
      return of();
    }

    const index = this.entries.findIndex((entry) => entry.idNumber === updatedEntry.idNumber);

    if (index !== -1) {
      this.entries[index] = { ...updatedEntry };
      this.entriesSubject.next([...this.entries]);
    }

    return of();
  }

  addEntry(newEntry: any): Observable<void> {
    const isDuplicate = this.entries.some((entry) => entry.idNumber === newEntry.idNumber);

    if (isDuplicate) {
      console.error('Duplicate entry detected!');
      return of();
    }

    this.entries.push({ ...newEntry });
    this.entriesSubject.next([...this.entries]);
    return of();
  }

  deleteEntry(idNumber: string): Observable<void> {
    return this.entriesSubject.pipe(
      take(1),
      map((entries) => {
        if (!entries || entries.length === 0) {
          //console.error('Entries array is undefined or empty.');
          return;
        }

        const updatedEntries = entries.filter((entry) => entry.idNumber !== idNumber);
        this.entries = updatedEntries;
        this.entriesSubject.next([...updatedEntries]);
      })
    );
  }

  validateEntryDuplication(entry: any, entries: any[]): Observable<boolean> {
    if (!entries) {
      console.error('Entries array is undefined or null.');
      return of(false);
    }

    const isDuplicate = entries.some((e) => e.idNumber === entry.idNumber);

    return of(!isDuplicate);
  }
}
