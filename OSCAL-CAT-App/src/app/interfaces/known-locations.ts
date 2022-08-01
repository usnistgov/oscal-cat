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
export enum CatSampleFileLanguage {
    None = 0x00,
    Json = 0x01,
    Xml = 0x02,
    Yaml = 0x04,
    // Schemas
    JsonSchema = 0x08,
    Xsd = 0x10,
}

export enum CatSampleFileLocation {
    None = 0x00,
    Local = 0x01,
    Remote = 0x02,
    Both = 0x03,
}

export enum CatSampleIntendedUse {
    Unknown = 0x00,
    CatalogSample = 0x01,
    BaselineResolved = 0x02,
    BaselineReference = 0x04,
    Schema4Validation = 0x0f,
}

export interface KnownOscalFileLocation {
    cat_enum?: KnownCatalogNames;
    cat_id: string;
    cat_suffix?: string;
    cat_label: string;
    cat_url: string;
    cat_file: string;
    cat_url_res?: string | null;
    cat_file_res?: string | null;
    cat_language: CatSampleFileLanguage;
    cat_location: CatSampleFileLocation;
    cat_use_as: CatSampleIntendedUse;
    cat_baselines?: Array<KnownOscalFileLocation> | null;
}

export enum KnownCatalogNames {
    UNDEFINED_CAT = 0x00,

    NIST_800_53_Rev4 = 0x01,
    NIST_Low_Rev4 = 0x02,
    NIST_Moderate_Rev4 = 0x03,
    NIST_High_Rev4 = 0x04,

    NIST_800_53_Rev5 = 0x08,
    NIST_Low_Rev5 = 0x0A,
    NIST_Moderate_Rev5 = 0x0B,
    NIST_High_Rev5 = 0x0C,
    NIST_Privacy_Rev5 = 0x0D,

    CUSTOM_CAT = 0x10,
}
