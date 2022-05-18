// KnownLocation structure for CATs
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
    NIST_800_53_Rev4 = 0x01,
    NIST_Low_Rev4 = 0x02,
    NIST_Moderate_Rev4 = 0x03,
    NIST_High_Rev4 = 0x04,

    NIST_800_53_Rev5 = 0x08,
    NIST_Low_Rev5 = 0x0A,
    NIST_Moderate_Rev5 = 0x0B,
    NIST_High_Rev5 = 0x0C,
    NIST_Privacy_Rev5 = 0x0D,
}
