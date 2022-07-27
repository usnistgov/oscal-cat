/*
 * Portions of this software was developed by employees of the National Institute
 * of Standards and Technology (NIST), an agency of the Federal Government and is
 * being made available as a public service. Pursuant to title 17 United States
 * Code Section 105, works of NIST employees are not subject to copyright
 * protection in the United States. This software may be subject to foreign
 * copyright. Permission in the United States and in foreign countries, to the
 * extent that NIST may hold copyright, to use, copy, modify, create derivative
 * works, and distribute this software and its documentation without fee is hereby
 * granted on a non-exclusive basis, provided that this notice and disclaimer
 * of warranty appears in all copies.
 *
 * THE SOFTWARE IS PROVIDED 'AS IS' WITHOUT ANY WARRANTY OF ANY KIND, EITHER
 * EXPRESSED, IMPLIED, OR STATUTORY, INCLUDING, BUT NOT LIMITED TO, ANY WARRANTY
 * THAT THE SOFTWARE WILL CONFORM TO SPECIFICATIONS, ANY IMPLIED WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND FREEDOM FROM
 * INFRINGEMENT, AND ANY WARRANTY THAT THE DOCUMENTATION WILL CONFORM TO THE
 * SOFTWARE, OR ANY WARRANTY THAT THE SOFTWARE WILL BE ERROR FREE.  IN NO EVENT
 * SHALL NIST BE LIABLE FOR ANY DAMAGES, INCLUDING, BUT NOT LIMITED TO, DIRECT,
 * INDIRECT, SPECIAL OR CONSEQUENTIAL DAMAGES, ARISING OUT OF, RESULTING FROM,
 * OR IN ANY WAY CONNECTED WITH THIS SOFTWARE, WHETHER OR NOT BASED UPON WARRANTY,
 * CONTRACT, TORT, OR OTHERWISE, WHETHER OR NOT INJURY WAS SUSTAINED BY PERSONS OR
 * PROPERTY OR OTHERWISE, AND WHETHER OR NOT LOSS WAS SUSTAINED FROM, OR AROSE OUT
 * OF THE RESULTS OF, OR USE OF, THE SOFTWARE OR SERVICES PROVIDED HEREUNDER.
 */

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
