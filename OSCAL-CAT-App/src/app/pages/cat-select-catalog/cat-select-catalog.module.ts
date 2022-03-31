
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CatSelectCatalogPageRoutingModule } from './cat-select-catalog-routing.module';
import { CatSelectCatalogPage } from './cat-select-catalog.page';


import { ComponentsModule } from './../all-components/components.module';
import { TreesModule } from './../all-components/trees.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CatSelectCatalogPageRoutingModule
    , ComponentsModule
    , TreesModule
  ],
  declarations: [CatSelectCatalogPage
  ],


})
export class CatSelectCatalogPageModule { }
