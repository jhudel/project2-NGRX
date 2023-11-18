import { createReducer, on } from '@ngrx/store';
import * as EntryActions from './actions';

export interface EntryState {
  entries: any[];
}

export const initialState: EntryState = {
  entries: [],
};

export const entryReducer = createReducer(
  initialState,
  on(EntryActions.createEntrySuccess, (state, { entry }) => {
    return { ...state, entries: [...state.entries, entry] };
  }),
  on(EntryActions.updateEntrySuccess, (state, { entry }) => {
    const index = state.entries.findIndex((e) => e.idNumber === entry.idNumber);
    return {
      ...state,
      entries: [...state.entries.slice(0, index), entry, ...state.entries.slice(index + 1)],
    };
  }),
  on(EntryActions.deleteEntrySuccess, (state, { idNumber }) => {
    return { ...state, entries: state.entries.filter((entry) => entry.idNumber !== idNumber) };
  })
);
