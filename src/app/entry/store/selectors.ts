import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EntryState } from './reducers';

export const selectEntryState = createFeatureSelector<EntryState>('entry');

export const selectAllEntries = createSelector(
  selectEntryState,
  (state: EntryState) => state.entries
);
