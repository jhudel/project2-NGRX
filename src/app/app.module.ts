// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { environment } from 'src/environments/environments';


import { AppComponent } from './app.component';
import { EntryComponent } from './entry/entry.component';
import { EntryService } from './entry.service';
import { entryReducer } from './entry/store/reducers';
import { EntryEffects } from './entry/store/effects';

@NgModule({
  declarations: [
    AppComponent,
    EntryComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({ entry: entryReducer }), 
    EffectsModule.forRoot([EntryEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
  ],
  providers: [EntryService],
  bootstrap: [AppComponent]
})
export class AppModule { }
