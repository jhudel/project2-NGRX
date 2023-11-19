import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import {tap, catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import * as EntryActions from './actions';
import { EntryService } from 'src/app/entry.service';
import { select, Store } from '@ngrx/store';
import { selectAllEntries } from './selectors';

@Injectable()
export class EntryEffects {
  constructor(private actions$: Actions, private entryService: EntryService, private store: Store) {}

  addEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryActions.createEntry),
      withLatestFrom(this.store.pipe(select(selectAllEntries))),
      mergeMap(([action, entries]) =>
        this.entryService.validateEntryDuplication(action.entry, entries).pipe(
          map((isValid) => {
            if (isValid) {
              return EntryActions.createEntrySuccess({ entry: action.entry });
            } else {
              return EntryActions.createEntryFailure({ error: 'Duplicate entry detected!' });
            }
          }),
          catchError(() => of(EntryActions.createEntryFailure({ error: 'Error occurred!' })))
        )
      )
    )
  );

  updateEntry$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EntryActions.updateEntry),
      withLatestFrom(this.store.pipe(select(selectAllEntries))),
      mergeMap(([action, entries]) =>
        this.entryService.validateEntryDuplication(action.entry, entries).pipe(
          map((isDuplicate) => {
            if (isDuplicate) {
              return EntryActions.updateEntryFailure({ error: 'Duplicate entry detected!' });
            } else {
              return EntryActions.updateEntrySuccess({ entry: action.entry });
            }
          }),
          catchError(() => of(EntryActions.updateEntryFailure({ error: 'Error occurred!' })))
        )
      )
    )
  );

deleteEntry$ = createEffect(() =>
  this.actions$.pipe(
    ofType(EntryActions.deleteEntry),
    tap(action => console.log('Delete Entry Action:', action)), 
    mergeMap(({ idNumber }) =>
      this.entryService.deleteEntry(idNumber).pipe(
        tap(() => console.log('Entry Deleted Successfully')),
        map(() => EntryActions.deleteEntrySuccess({ idNumber })),
        catchError(() => {
          console.error('Error occurred during entry deletion'); 
          return of(EntryActions.deleteEntryFailure());
        })
      )
    )
  )
);


}
