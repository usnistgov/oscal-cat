
import { Injectable } from '@angular/core';
import {
    KnownOscalFileLocation, CatSampleFileLanguage,
    CatSampleFileLocation, CatSampleIntendedUse, KnownCatalogNames
} from './../../interfaces/known-locations';



@Injectable({
    providedIn: 'root'
})
export class KnownOscalFilesService {
    private static catsPath = './../../assets/oscal-cats/';
    private static catsBase4NIST = 'https://raw.githubusercontent.com/usnistgov/oscal-content/master/nist.gov/';
    private static catsUrl4NIST80053r4 = 'https://raw.githubusercontent.com/usnistgov/oscal-content/master/nist.gov/SP800-53/rev4/json/';
    private static catsUrl4NIST80053r5 = 'https://raw.githubusercontent.com/usnistgov/oscal-content/master/nist.gov/SP800-53/rev5/json/';
    private static proPath = './../../assets/oscal-profiles/';
    private static proPath80053r4 = './../../assets/oscal-profiles/baselines-800-53-rev4/';
    private static proPath80053r5 = './../../assets/oscal-profiles/baselines-800-53-rev5/';
    private static knownFiles: Array<KnownOscalFileLocation> = [
        {
            cat_enum: KnownCatalogNames.NIST_800_53_Rev4,
            cat_id: 'NIST SP 800-53 Rev4 Catalog',
            cat_label: '800-53 Rev4 Catalog',
            cat_url: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_catalog-min.json',
            cat_file: KnownOscalFilesService.catsPath + 'NIST_SP-800-53_rev4_catalog.json',
            cat_language: CatSampleFileLanguage.Json,
            cat_location: CatSampleFileLocation.Both,
            cat_use_as: CatSampleIntendedUse.CatalogSample,
            cat_baselines: [
                {
                    cat_enum: KnownCatalogNames.NIST_Low_Rev4,
                    cat_id: 'NIST SP 800-53 Rev4 Low Baseline',
                    cat_label: '800-53 Rev4 Low Baseline',
                    cat_url: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_LOW-baseline_profile.json',
                    cat_file: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_LOW-baseline_profile.json',
                    cat_url_res: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_LOW-baseline-resolved-profile_catalog.json',
                    cat_file_res: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_LOW-baseline-resolved-profile_catalog.json',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineResolved,
                    cat_baselines: null,
                },
                {
                    cat_enum: KnownCatalogNames.NIST_Moderate_Rev4,
                    cat_id: 'NIST SP 800-53 Rev4 Moderate Baseline',
                    cat_label: '800-53 Rev4 Moderate Baseline',
                    cat_url: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_MODERATE-baseline_profile.json',
                    cat_file: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_MODERATE-baseline_profile.json',
                    cat_url_res: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_MODERATE-baseline-resolved-profile_catalog.json',
                    cat_file_res: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_MODERATE-baseline-resolved-profile_catalog.json',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineResolved,
                    cat_baselines: null,
                },
                {
                    cat_enum: KnownCatalogNames.NIST_High_Rev4,
                    cat_id: 'NIST SP 800-53 Rev4 High Baseline',
                    cat_label: '800-53 Rev4 High Baseline',
                    cat_url: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_HIGH-baseline_profile.json',
                    cat_file: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_HIGH-baseline_profile.json',
                    cat_url_res: KnownOscalFilesService.catsUrl4NIST80053r4 + 'NIST_SP-800-53_rev4_HIGH-baseline-resolved-profile_catalog.json',
                    cat_file_res: KnownOscalFilesService.proPath80053r4 + 'NIST_SP-800-53_rev4_HIGH-baseline-resolved-profile_catalog.json',
                    cat_language: CatSampleFileLanguage.Json,
                    cat_location: CatSampleFileLocation.Both,
                    cat_use_as: CatSampleIntendedUse.BaselineResolved,
                    cat_baselines: null,
                },
            ],
        }, {
            cat_id: '800-53 Rev5 Oscal Catalog',
            cat_label: '800-53 Rev4',
            cat_url: 'https://raw.githubusercontent.com/usnistgov/OSCAL/master/content/nist.gov/SP800-53/rev5/json/NIST_SP-800-53_rev5-FPD_catalog-min.json',
            // /Users/dac4/vBoxShares/ui4OSCAL/src/assets/oscal-cats/NIST-800-53-rev5.json
            cat_file: './../../assets/oscal-cats/NIST-800-53-rev5.json',
            cat_language: CatSampleFileLanguage.Json,
            cat_location: CatSampleFileLocation.Both,
            cat_use_as: CatSampleIntendedUse.CatalogSample,
            cat_baselines: [

            ],
        }, {
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
    ];
    constructor() {
    }

    static getSpecifiedCatFile(theKnownCat: KnownCatalogNames) {
        return this.knownFiles.filter(m => m.cat_enum === theKnownCat);
    }

    static getKnownCatSampleFiles() {
        return this.knownFiles.filter(m => m.cat_use_as === CatSampleIntendedUse.CatalogSample);
    }

    static getKnownProfileSampleFiles(cat: KnownOscalFileLocation) {
        return cat.cat_baselines.filter(m => m.cat_use_as === CatSampleIntendedUse.BaselineResolved);
    }

    static getAllKnownFiles() {
        return KnownOscalFilesService.knownFiles;
    }

}

