import { createAction, props } from '@ngrx/store';

export const createEntry = createAction(
  '[Entry] Add Entry',
  props<{ entry: any }>()
);

export const createEntrySuccess = createAction(
  '[Entry] Add Entry Success',
  props<{ entry: any }>()
);

export const validateDuplicateEntry = createAction(
  '[Entry] Validate Duplicate Entry',
  props<{ entry: any }>()
);

export const validateDuplicateEntrySuccess = createAction(
  '[Entry] Validate Duplicate Entry Success',
  props<{ isDuplicate: boolean }>()
);

export const validateDuplicateEntryFailure = createAction(
  '[Entry] Validate Duplicate Entry Failure'
);

export const updateEntry = createAction(
  '[Entry] Update Entry',
  props<{ entry: any }>()
);

export const updateEntrySuccess = createAction(
  '[Entry] Update Entry Success',
  props<{ entry: any }>()
);

export const deleteEntry = createAction(
  '[Entry] Delete Entry',
  props<{ idNumber: string }>()
);

export const deleteEntrySuccess = createAction(
  '[Entry] Delete Entry Success',
  props<{ idNumber: string }>()
);

export const deleteEntryFailure = createAction(
  '[Entry] Delete Entry Failure'
);

export const createEntryFailure = createAction(
  '[Entry] Add Entry Failure',
  props<{ error: string }>() 
);

export const updateEntryFailure = createAction(
  '[Entry] Update Entry Failure',
  props<{ error: string }>()
);
