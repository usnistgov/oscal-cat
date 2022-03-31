//import { createSelector } from '@ngrx/store';
// import { ResolvedStaticSymbol } from '@angular/compiler';

import { Catalog } from '../../../interfaces/oscal-types/oscal-catalog.types';




export class CatalogSamples {
    private listOfDocs: Array<CatalogSample>;
    constructor() {
        this.listOfDocs = new Array<CatalogSample>();
        this.add('Remote 800-53 Rev-5',
            'https://raw.githubusercontent.com/usnistgov/OSCAL/master/content/nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5-FPD_catalog-min.json',
            false);
        this.add('Remote 800-53 Rev-4',
            'https://raw.githubusercontent.com/usnistgov/OSCAL/master/content/nist.gov/SP800-53/rev4/json/NIST_SP-800-53_rev4_catalog-min.json',
            false);
        this.add('Local 800-53 Rev-4',
            '',
            true);
    }
    addSample(sample: CatalogSample): Array<CatalogSample> {
        if (sample && !sample.getJson) {

        }
        return this.listOfDocs; // Maybe return detached copy of the list
    }

    add(resTitle: string, resPath: string, isLocal?: boolean): Array<CatalogSample> {
        const sample = new CatalogSample(resTitle, resPath, isLocal);
        return this.addSample(sample);
    }

}


/// Returns JSON of the OSCAL catalog sample
export class CatalogSample {
    isLocalResource: boolean;
    label: string;
    pathToResource: string;
    private resourceJson?: Catalog;
    private resourceXml?: Catalog; //  Should be of Catalog Type XML or Json

    constructor(resTitle: string, resPath: string, isLocal?: boolean) {
        this.label = resTitle;
        if (isLocal) {
            this.isLocalResource = isLocal;
        } else {
            this.isLocalResource = this.isLocal(resPath);
        }
        this.pathToResource = resPath;
    }

    isLocal(resPath: string): boolean {
        let retValLocal = false;
        if (resPath && resPath.trim().toLowerCase().startsWith('http')) {
            // http should begin all the remote resource paths
            retValLocal = false;
        } else if (resPath) {
            // Consider the resource local in case of absent http in the beginning
            retValLocal = true;
        }
        return retValLocal;
    }

    loadResource() {
        if (this.isLocalResource) {
            // local resource load from PathToResource
            this.resourceJson = undefined;
        } else {

        }
    }

    getJson(): Catalog {
        return this.resourceJson;
    }
}
