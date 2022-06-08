import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { RecursiveTreeCatComponent } from './tree-cat/recursive-tree-cat.component';
import { TreeCatComponent } from './tree-cat/tree-cat.component';
import { RecursiveProfileComponent } from './tree-profile/recursive-profile.component';
import { TreeProfileComponent } from './tree-profile/tree-profile.component';
import { ListGroupsComponent } from './list-groups/list-groups.component';
import { TreeGroupsComponent } from './tree-groups/tree-groups.component';
import { RecursiveGroupsComponent } from './tree-groups/recursive-groups.component';
//import { XCatTreeComponent } from './x-cat-tree-select/x-cat-tree-select.component';
//import { RecursiveXCatTreeSelectComponent } from './x-cat-tree-select/recursive-x-cat-tree-select.component';


@NgModule({
  declarations: [TreeCatComponent, RecursiveTreeCatComponent,
    TreeProfileComponent, RecursiveProfileComponent,
    TreeGroupsComponent, RecursiveGroupsComponent,
    ListGroupsComponent,
    //    ZCatTreeComponent, RecursiveZCatTreeSelectComponent
  ],
  exports: [RecursiveTreeCatComponent, TreeCatComponent, TreeProfileComponent, RecursiveGroupsComponent,
    RecursiveProfileComponent, ListGroupsComponent, TreeGroupsComponent, TreeGroupsComponent,
    //    ZCatTreeComponent, RecursiveZCatTreeSelectComponent
  ],

  imports: [IonicModule, ReactiveFormsModule, FormsModule, CommonModule,
  ]
})
export class TreesModule { }
