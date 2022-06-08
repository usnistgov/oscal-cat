import { Injectable } from '@angular/core';

import { TreeItemEntry, TreeNodeType } from './../app-state/app-tree/tree-elements';
import { KnownCatalogNames, KnownOscalFileLocation } from './../../interfaces/known-locations';
import { Convert, Catalog, Profile, Control, ControlGroup, Call, } from './../../interfaces/oscal-types/oscal-catalog.types';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  catBaselines: Array<Profile>;

  constructor() {
  }

  initBaselines(catInfo: KnownOscalFileLocation) {
    const baselines = catInfo.cat_baselines;
    for (let baseline in baselines) {
      // Open baseline-profile

      // Scan all controls in the baseline-profile and mark them in the tree 

    }
  }

  markCatBaseline(catInfo: KnownOscalFileLocation, cat: Array<TreeItemEntry>, profile: Profile) {
    if (profile.imports && profile.imports.length > 0) {
      if (profile.imports[0].includeControls && profile.imports[0].includeControls.length > 0) {

        for (let id: string in profile.imports[0].includeControls[0].withIDS) {

          if (cat.)
        }
      }
    }
  }


  requireJsonProfile(jsonFile: string): Profile {
    const newProfile: Profile = require(jsonFile);
    return newProfile;
  }



}
