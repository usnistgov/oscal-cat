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

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from '@ionic/angular';

import { OscalRemoteFile, SchemaFile } from '../app-state/state-nav-cat/os-files.service';
import {
    KnownOscalFileLocation, CatSampleFileLanguage,
    CatSampleFileLocation, CatSampleIntendedUse, KnownCatalogNames
} from './../../interfaces/known-locations';
import { Catalog, Profile } from 'src/app/interfaces/oscal-types/oscal-catalog.types';



@Injectable({
    providedIn: 'root'
})
export class KnownOscalFilesService {


    private static schemaGitTag = 'v1.0.4';
    private static contentGitTag = 'v1.0.0';

    private static oscalUrlBase = 'https://raw.githubusercontent.com/usnistgov/OSCAL/';
    private static contentUrlBase = 'https://raw.githubusercontent.com/usnistgov/oscal-content/';

    private static cat_local = 'assets/oscal-cats/json-schemas/oscal_catalog_schema.json';
    private static cat_url = `https://raw.githubusercontent.com/usnistgov/OSCAL/${KnownOscalFilesService.contentGitTag}/json/schema/oscal_catalog_schema.json`;

    private static pro_local = 'assets/oscal-cats/json-schemas/oscal_profile_schema.json';
    private static pro_url = `https://raw.githubusercontent.com/usnistgov/OSCAL/${KnownOscalFilesService.contentGitTag}/json/schema/oscal_profile_schema.json`;
    // https://raw.githubusercontent.com/usnistgov/OSCAL/v1.0.0/json/schema/oscal_catalog_schema.json
    // https://raw.githubusercontent.com/usnistgov/OSCAL/v1.0.4/json/schema/oscal_catalog_schema.json

    //`https://raw.githubusercontent.com/usnistgov/OSCAL/${KnownOscalFilesService.schemaGitTag}/json/schema/oscal_catalog_schema.json`;
    // https://raw.githubusercontent.com/usnistgov/oscal-content/v1.0.0/nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5_LOW-baseline_profile.json

    // App-Dir-Local fall-back files (leftover form the disconnected alfa version)
    private static catsPath = '/assets/oscal-cats/'; // app/src/assets/oscal-cats/
    private static proPath = '/assets/oscal-cats/baselines/';
    private static proPath80053r4 = '/assets/oscal-profiles/baselines-800-53-rev4/';
    private static proPath80053r5 = '/assets/oscal-profiles/baselines-800-53-rev5/';

    // URLs for remote catalog/profile/resolved profile files
    private static catsBase4NIST =
        `https://raw.githubusercontent.com/usnistgov/oscal-content/${KnownOscalFilesService.contentGitTag}/nist.gov/`;
    private static catsUrl4NIST80053r4 =
        `https://raw.githubusercontent.com/usnistgov/oscal-content/${KnownOscalFilesService.contentGitTag}/nist.gov/SP800-53/rev4/json/`;
    private static catsUrl4NIST80053r5 =
        `https://raw.githubusercontent.com/usnistgov/oscal-content/${KnownOscalFilesService.contentGitTag}/nist.gov/SP800-53/rev5/json/`;

    private static cat_schema: SchemaFile;
    private static pro_schema: SchemaFile;

    private static knownCatFiles: Array<KnownOscalFileLocation> = [
        {
            cat_enum: KnownCatalogNames.NIST_800_53_Rev4,
            cat_id: 'NIST SP 800-53 Rev4 Catalog',
            cat_suffix: '800-53.Rev-4',
            cat_label: 'Catalog 800-53 Revision 4',
            cat_url: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_catalog-min.json',
            cat_file: KnownOscalFilesService.catsPath + 'NIST_SP-800-53_rev4_catalog.json',
            cat_language: CatSampleFileLanguage.Json,
            cat_location: CatSampleFileLocation.Both,
            cat_use_as: CatSampleIntendedUse.CatalogSample,

            cat_baselines: [
                {
                    cat_enum: KnownCatalogNames.NIST_Low_Rev4,
                    cat_id: 'NIST SP 800-53 Rev4 Low Baseline',
                    cat_suffix: 'Low',
                    cat_label: '800-53 Rev4 Low Baseline',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineReferenceAndResolved,
                    cat_baselines: null,

                    pro_url: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_LOW-baseline_profile-min.json',
                    pro_file: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_LOW-baseline_profile-min.json',
                    pro_url_res: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_LOW-baseline-resolved-profile_catalog-min.json',
                    pro_file_res: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_LOW-baseline-resolved-profile_catalog-min.json',

                    pro_color: 'baseline-low',
                    pro_short_label: 'L',
                },
                {
                    cat_enum: KnownCatalogNames.NIST_Moderate_Rev4,
                    cat_id: 'NIST SP 800-53 Rev4 Moderate Baseline',
                    cat_suffix: 'Moderate',
                    cat_label: '800-53 Rev4 Moderate Baseline',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineReferenceAndResolved,
                    cat_baselines: null,

                    pro_url: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_MODERATE-baseline_profile-min.json',
                    pro_file: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_MODERATE-baseline_profile-min.json',
                    pro_url_res: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_MODERATE-baseline-resolved-profile_catalog-min.json',
                    pro_file_res: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_MODERATE-baseline-resolved-profile_catalog-min.json',

                    pro_color: 'baseline-medium',
                    pro_short_label: 'M',
                },
                {
                    cat_enum: KnownCatalogNames.NIST_High_Rev4,
                    cat_id: 'NIST SP 800-53 Rev4 High Baseline',
                    cat_suffix: 'High',
                    cat_label: '800-53 Rev4 High Baseline',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineReferenceAndResolved,
                    cat_baselines: null,

                    pro_url: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_HIGH-baseline_profile-min.json',
                    pro_file: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_HIGH-baseline_profile-min.json',
                    pro_url_res: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_HIGH-baseline-resolved-profile_catalog-min.json',
                    pro_file_res: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_HIGH-baseline-resolved-profile_catalog-min.json',

                    pro_color: 'baseline-high',
                    pro_short_label: 'H',
                }
            ]
        },

        {
            cat_id: '800-53 Rev5 Oscal Catalog',
            cat_label: 'Catalog 800-53 Revision 5',
            cat_suffix: '800-53.Rev-5',
            cat_url: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_catalog-min.json',
            // /Users/dac4/vBoxShares/ui4OSCAL/src/assets/oscal-cats/NIST-800-53-rev5.json
            cat_file: './../../assets/oscal-cats/NIST-800-53-rev5.json',
            cat_language: CatSampleFileLanguage.Json,
            cat_location: CatSampleFileLocation.Both,
            cat_use_as: CatSampleIntendedUse.CatalogSample,
            cat_baselines: [
                {
                    cat_enum: KnownCatalogNames.NIST_Low_Rev5,
                    cat_id: 'NIST SP 800-53 Rev5 Low Baseline',
                    cat_suffix: 'Low',
                    cat_label: '800-53 Rev5 Low Baseline',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineReferenceAndResolved,
                    cat_baselines: null,

                    pro_url: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_LOW-baseline_profile-min.json',
                    pro_file: KnownOscalFilesService.proPath80053r5 + 'NIST_SP-800-53_rev5_LOW-baseline_profile-min.json',
                    pro_url_res: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_LOW-baseline-resolved-profile_catalog-min.json',
                    pro_file_res: KnownOscalFilesService.proPath80053r5 + 'NIST_SP-800-53_rev5_LOW-baseline-resolved-profile_catalog-min.json',

                    pro_color: 'baseline-low',
                    pro_short_label: 'L',
                },
                {
                    cat_enum: KnownCatalogNames.NIST_Moderate_Rev4,
                    cat_id: 'NIST SP 800-53 Rev5 Moderate Baseline',
                    cat_suffix: 'Moderate',
                    cat_label: '800-53 Rev5 Moderate Baseline',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineReferenceAndResolved,
                    cat_baselines: null,

                    pro_url: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_MODERATE-baseline_profile-min.json',
                    pro_file: KnownOscalFilesService.proPath80053r5 + 'NIST_SP-800-53_rev5_MODERATE-baseline_profile-min.json',
                    pro_url_res: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_MODERATE-baseline-resolved-profile_catalog-min.json',
                    pro_file_res: KnownOscalFilesService.proPath80053r5 + 'NIST_SP-800-53_rev5_MODERATE-baseline-resolved-profile_catalog-min.json',

                    pro_color: 'baseline-medium',
                    pro_short_label: 'M',
                },
                {
                    cat_enum: KnownCatalogNames.NIST_High_Rev4,
                    cat_id: 'NIST SP 800-53 Rev5 High Baseline',
                    cat_suffix: 'High',
                    cat_label: '800-53 Rev5 High Baseline',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineReferenceAndResolved,
                    cat_baselines: null,

                    pro_url: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_HIGH-baseline_profile-min.json',
                    pro_file: KnownOscalFilesService.proPath80053r5 + 'NIST_SP-800-53_rev5_HIGH-baseline_profile-min.json',
                    pro_url_res: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_HIGH-baseline-resolved-profile_catalog-min.json',
                    pro_file_res: KnownOscalFilesService.proPath80053r5 + 'NIST_SP-800-53_rev5_HIGH-baseline-resolved-profile_catalog-min.json',

                    pro_color: 'baseline-high',
                    pro_short_label: 'H',
                },
                {
                    cat_enum: KnownCatalogNames.NIST_Privacy_Rev5,
                    cat_id: 'NIST SP 800-53 Rev5 Privacy Baseline',
                    cat_suffix: 'Privacy',
                    cat_label: '800-53 Rev5 Privacy Baseline',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineReferenceAndResolved,
                    cat_baselines: null,

                    pro_url: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_PRIVACY-baseline_profile-min.json',
                    pro_file: KnownOscalFilesService.proPath80053r5 + 'NIST_SP-800-53_rev5_PRIVACY-baseline_profile-min.json',
                    pro_url_res: KnownOscalFilesService.catsUrl4NIST80053r5 + 'NIST_SP-800-53_rev5_PRIVACY-baseline-resolved-profile_catalog-min.json',
                    pro_file_res: KnownOscalFilesService.proPath80053r5 + 'NIST_SP-800-53_rev5_PRIVACY-baseline-resolved-profile_catalog-min.json',

                    pro_color: 'baseline-privacy',
                    pro_short_label: 'P',
                }
            ]
        }
        /*         
            ,{
                    cat_id: 'Oscal Catalog JSON Schema',
                    cat_label: 'OSCAL Cat JSON-Schema',
                    cat_url: 'https://raw.githubusercontent.com/usnistgov/OSCAL/master/json/schema/oscal_catalog_schema.json',
                    cat_file: '',
                    cat_language: CatSampleFileLanguage.JsonSchema,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.Schema4Validation,
                    cat_baselines: [
        
                    ],
                }, 
        */
    ];

    constructor(httpClient: HttpClient, storage: Storage, platform: Platform,) {
        console.log(`Loading Schemas`);
        this.loadSchemas(httpClient, storage, platform);

        console.log(`Loading Cats`);
        this.initCatsProfilesBaselines(httpClient, storage, platform);
    }

    loadSchemas(httpClient: HttpClient, storage: Storage, platform: Platform) {
        if (!KnownOscalFilesService.cat_schema) {
            KnownOscalFilesService.cat_schema = new SchemaFile(
                httpClient, storage, platform,
                KnownOscalFilesService.cat_url, KnownOscalFilesService.cat_local);
        }
        if (!KnownOscalFilesService.pro_schema) {
            KnownOscalFilesService.pro_schema = new SchemaFile(
                httpClient, storage, platform,
                KnownOscalFilesService.pro_url, KnownOscalFilesService.pro_local);
        }
        if (KnownOscalFilesService.cat_schema && !KnownOscalFilesService.cat_schema.schema) {
            KnownOscalFilesService.cat_schema.loadSchema();
        }
        if (KnownOscalFilesService.pro_schema && !KnownOscalFilesService.pro_schema.schema) {
            KnownOscalFilesService.pro_schema.loadSchema();
        }
    }


    initCatsProfilesBaselines(httpClient: HttpClient, storage: Storage, platform: Platform) {
        KnownOscalFilesService.knownCatFiles.forEach(
            cat => {
                if (!cat.content_cat) {
                    cat.content_cat = new OscalRemoteFile<Catalog>(
                        httpClient, storage, platform,
                        cat.cat_url,
                        cat.cat_file,
                        KnownOscalFilesService.cat_schema.schema
                    );
                    if (!cat.content_cat.loadedEntity) {
                        cat.content_cat.loadRemoteEntity();
                    }
                }
                if (cat.cat_baselines && cat.cat_baselines.length > 0) {
                    cat.cat_baselines.forEach(
                        catBaseline => {
                            if (!cat.content_pro) {
                                cat.content_pro = new OscalRemoteFile<Profile>(
                                    httpClient, storage, platform,
                                    catBaseline.pro_url,
                                    catBaseline.pro_file,
                                    KnownOscalFilesService.pro_schema.schema
                                )
                            }
                            if (!cat.content_res_pro) {
                                cat.content_res_pro = new OscalRemoteFile<Catalog>(
                                    httpClient, storage, platform,
                                    catBaseline.pro_url_res,
                                    catBaseline.pro_file_res,
                                    KnownOscalFilesService.cat_schema.schema
                                )
                            }

                            if (!cat.content_pro.loadedEntity) {
                                cat.content_pro.loadRemoteEntity();
                            }
                            if (!cat.content_res_pro.loadedEntity) {
                                cat.content_res_pro.loadRemoteEntity();
                            }
                        })
                }
            }
        )
    }

    getSpecifiedCatFile(theKnownCat: KnownCatalogNames) {
        return KnownOscalFilesService.knownCatFiles.filter(m => m.cat_enum === theKnownCat);
    }

    getKnownCatSampleFiles() {
        return KnownOscalFilesService.knownCatFiles.filter(m => m.cat_use_as === CatSampleIntendedUse.CatalogSample);
    }

    getKnownProfileSampleFiles(cat: KnownOscalFileLocation) {
        return cat.cat_baselines.filter(m => m.cat_use_as === CatSampleIntendedUse.BaselineResolved);
    }

    getAllKnownFiles() {
        return KnownOscalFilesService.knownCatFiles;
    }

    getCatSchema(): SchemaFile {
        return KnownOscalFilesService.cat_schema
    }

    getProSchema(): SchemaFile {
        return KnownOscalFilesService.pro_schema
    }
}

@Injectable({
    providedIn: 'root'
}) export class OscalCatalogsService {

}

