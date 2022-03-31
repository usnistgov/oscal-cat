import { Catalog, Profile } from './../oscal-types/oscal-catalog.types';
import { PrevCurrentNext } from './../../providers/app-state/state-nav-cat/pages.service';
//import { CatalogSample } from './state-oscal-document/oscal-catalog-sample';

// import { createSelector } from '@ngrx/store';
// import { ResolvedStaticSymbol } from '@angular/compiler';

export interface User { // ==
    id: number;
    name: string;
}

export interface Book { // ==
    id: number;
    userId: number;
    name: string;
}

export enum AuthoringMode {
    ValueNotSet = 0,
    AuthorProfileFromSample = 1,
    AuthorProfileFromMultiple = 2,
    AuthorNewBaseline = 3,
    AuthorNewCatalog = 4,
}

export interface AppState {
    authoringMode: AuthoringMode;
    // catalogSamples: CatalogSample[];
    workingProfile: Profile;
    editedDocument: Catalog;
    pageState: PrevCurrentNext;

    // Sample of working with selectors
    selectedUser: User;
    allBooks: Book[];
}


