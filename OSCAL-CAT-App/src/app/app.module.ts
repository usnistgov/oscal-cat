import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogService } from './providers/oscal-data/catalog.service';
import { KnownOscalFilesService } from './providers/oscal-files/known-files.service';

@NgModule({
  declarations: [AppComponent


  ],
  entryComponents: [],
  imports: [
    IonicModule.forRoot()
    , IonicStorageModule.forRoot()
    , BrowserModule
    , AppRoutingModule
    , FormsModule
    , ReactiveFormsModule
    , CommonModule
    , IonicModule
    ,
  ],

  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }

    , CatalogService
    // , CatalogAsyncService
    , KnownOscalFilesService,
  ],

  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
