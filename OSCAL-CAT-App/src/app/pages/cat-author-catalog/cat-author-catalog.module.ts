import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CatAuthorCatalogPageRoutingModule } from './cat-author-catalog-routing.module';
import { CatAuthorCatalogPage } from './cat-author-catalog.page';
import { ComponentsModule } from './../all-components/components.module';
import { TreesModule } from './../all-components/trees.module';

@NgModule({
  imports: [CommonModule
    , FormsModule
    , IonicModule
    , CatAuthorCatalogPageRoutingModule
    , FormsModule
    , ReactiveFormsModule
    , ComponentsModule
    , TreesModule
    // , SelectFamiliesComponent
    // , BrowserModule,
    // , FormBuilder,
    // , Validators
  ],
  declarations: [CatAuthorCatalogPage
  ]
})
export class CatAuthorCatalogPageModule { }
