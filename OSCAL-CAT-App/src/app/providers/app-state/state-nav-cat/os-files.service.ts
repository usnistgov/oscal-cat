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
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ReadStream } from 'fs';
import { Observable } from 'rxjs/internal/Observable';
import { Catalog, Profile } from 'src/app/interfaces/oscal-types/oscal-catalog.types';
import { KvServiceBase } from './state-kv-base.service';
import addFormats from "ajv-formats"
import Ajv from "ajv"


export class AjvValidationResult {
    isValid: boolean;
    /*
    export interface ErrorObject<K extends string = string, P = Record<string, any>, S = unknown> {
        keyword: K;
        instancePath: string;
        schemaPath: string;
        params: P;
        propertyName?: string;
        message?: string;
        schema?: S;
        parentSchema?: AnySchemaObject;
        data?: unknown;
    }
    */
    validationErrors: Array<any>;

    constructor(isValid: boolean, errors: Array<any>) {
        this.validationErrors = errors;
        this.isValid = isValid;
    }
}

export type returnResultDelegate<ResultType> = (result: FilePullResult<ResultType>) => void;
export class FilePullResult<ResultType>{

    resultEntity: ResultType;
    validationInfo: AjvValidationResult

    constructor(result: ResultType, validationInfo: AjvValidationResult) {
        this.resultEntity = result;
        this.validationInfo = validationInfo;
    }
}


@Injectable({
    providedIn: 'root'
})
export class OsFileOperations /* extends KvServiceBase */ {
    session_id: string;
    httpFileData: any;
    doneLoadDateTime: number;


    constructor(
        public httpClient: HttpClient,
        public storage: Storage,
        public platform: Platform,
    ) {
        // super(storage, platform);
    }

    public consoleLogFile(fileName) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            console.log('csv content', e.target.result);
        };
        reader.readAsDataURL(fileName);
    }


    public isStale(hoursOld: number = 12) {
        const diff = (
            (Date.now() - this.doneLoadDateTime)
            / (1000 /* ms adjust */ * 3600 /* seconds adjust */)
        )
        return (diff > hoursOld);
    }

    uploadFileToSession(files: FileList) {
        const uploadedFile = files.item(0);
        const fileReader = new FileReader();
        if (files.length >= 1) {
            fileReader.onload = (f: any) => {
                console.log(`File:\n ${f.target.result}`);
            }
            fileReader.readAsDataURL(files.item[0]);
            console.log(`Result:\n${fileReader.result}`);
        }
        this.consoleLogFile(uploadedFile);
    }

    uploadFileFromUser(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = () => {
            // get the blob of the image:
            let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
            // create blobURL, such that we could use it in an image element:
            let blobURL: string = URL.createObjectURL(blob);
        };
        reader.onerror = (error) => {
            //handle errors
        };
    };


    /**
     *  Pulls in data over HTTP
     *
     * @param {string} url: URL of the file to pull in
     * @returns In-memory representation data of the file
     * @memberof OsFileOperations
     */
    getHttpFile(url: string) {
        var file = url;
        this.httpClient.get(file)
            .subscribe(
                data => { // On next operation
                    console.log(data);
                    this.httpFileData = data;
                    console.log(JSON.stringify(data));
                },
                error => {// Process error
                    console.log(`Error reading URL:${url}:\n\t${error}`);
                    // Here fallback to the local resource

                },
                () => { // Complete operation

                }
            )

        return this.httpFileData;
    }

    /**
     * Produces Observable object from the provided URL
     * @param {string} url - the URL of the Catalog
     * @returns {Observable<Catalog>} - Observable entity of the Catalog type
     * @memberof OsFileOperations
     */
    getHttpCatalog(url: string): Observable<Catalog> {
        return this.getHttpEntity<Catalog>(url);
    }

    /**
     * Produces observable of a Profile type from the provided URL
     * @param {string} url - the URL for the profile download
     * @returns {Observable<Profile>} - Observable of the Profile type
     * @memberof OsFileOperations
     */
    getHttpProfile(url: string): Observable<Profile> {
        return this.getHttpEntity<Profile>(url);
    }


    /**
     * Produces observable of a Profile type from the provided URL
     * @param {string} url - the URL for the profile download
     * @returns {Observable<Profile>} - Observable of the Profile type
     * @memberof OsFileOperations
     */
    getHttpEntity<ResultType>(url: string): Observable<ResultType> {
        return this.httpClient.get<ResultType>(url);
    }

    /**
     *  Using AJV the function validates object compliance to JSON-Schema
     * @param theData JSON Object downloaded from URL or File
     * @param theSchema Schema to use for validation
     * @returns 
     */
    isObjectValid(theData: any, theSchema: any): boolean {

        // const Ajv = require("ajv");
        const ajv = new Ajv();
        const addFormats = require("ajv-formats");
        addFormats(ajv);    // Assures Cat's date-time validation

        const isValid = ajv.validate(theSchema, theData);
        if (!isValid) {
            console.log(ajv.errors);
        }
        return isValid;
    }

    /**
     * Validate JSON Object using AJV and JSON-Schema
     *
     * @returns {ajvValidationResult}
     * @memberof OsFileOperations
     */
    isValidByAjv(theData: any, theSchema: any): AjvValidationResult {
        // const Ajv = require("ajv");
        const ajv = new Ajv();
        const addFormats = require("ajv-formats");
        addFormats(ajv);    // Assures Cat's date-time validation

        const isValid = ajv.validate(theSchema, theData);
        if (!isValid) {
            console.log(ajv.errors);
        }
        return new AjvValidationResult(isValid, ajv.errors);

    }



}

/**
 * Two-tier logic for 
 * 1. Pulling in the remote files form the central Schema repositories
 *    with fallback on the local copies
 * 2. Validate the pulled catalogs/profiles with the corresponding schemas
 *    and populate corresponding flags indicating the validation results 
 *
 * @export
 * @class OscalRemoteFile
 * @extends {OsFileOperations}
 * @template ResultType
 */
@Injectable({
    providedIn: 'root'
})
export class OscalRemoteFile<ResultType> extends OsFileOperations /* extends KvServiceBase */ {

    session_id: string;

    remoteUrl: string;
    localUrl: string;

    entitySchema: any;
    loadedEntity: ResultType;

    isLoaded: boolean;
    isRemoteFile: boolean;
    isRemoteFileError: boolean;
    isRemoteFileDone: boolean;
    isLocalFileError: boolean;
    isLocalFileDone: boolean;

    validationResult: FilePullResult<ResultType>;

    constructor(
        public httpClient: HttpClient,
        public storage: Storage,
        public platform: Platform,
        public urlFile?: string,
        public localFile?: string,
        public schema?: any,
        public storeName?: string
    ) {
        super(httpClient, storage, platform);
        this.entitySchema = schema;
        this.remoteUrl = urlFile;
        this.localUrl = localFile;

        // console.log(this.remoteUrl);
        // console.log(this.localUrl);

        // No Observables in Constructor !!! - it may blow occasionally.
        // this.loadRemoteEntity(this.remoteUrl);
    }

    loadRemoteEntity(url?: string) {
        if (!url) {
            url = this.remoteUrl;
        }
        // console.log(`Loading... ${url}`);
        this.getHttpEntity<any>(url)
            .subscribe(
                data => {
                    this.loadedEntity = data;
                    this.isRemoteFile = true;
                    // console.log('DATA-Stage #1');
                    // console.log(this.loadedEntity);
                },
                error => {// Process error
                    // console.log('ERROR-Stage #1');
                    this.isRemoteFileError = error;
                    if (error && this.localUrl) {
                        this.isRemoteFile = false;
                        // console.log(`Remote load Error`);
                        // console.log(error);
                        this.loadLocalEntity(this.localUrl);
                    }
                },
                () => { // Complete operation
                    // console.log(`DONE-Stage #1 ${this.remoteUrl}`);
                    this.isRemoteFileDone = true;
                    if (this.isRemoteFileError && !this.isRemoteFile && this.localUrl) {
                        this.loadLocalEntity(this.localUrl);
                    }
                    if (this.loadedEntity && this.entitySchema) {
                        this.validationResult = this.validateSchemaByAjv(this.loadedEntity, this.entitySchema);
                        // console.log(this.validationResult)
                    }
                    this.doneLoadDateTime = Date.now();
                }
            );
    }

    loadLocalEntity(localUrl: string) {
        if (!localUrl) {
            localUrl = this.localUrl;
        }
        // console.log(url);
        this.getHttpEntity<any>(localUrl)
            .subscribe(
                data => {
                    this.loadedEntity = data;
                    this.isRemoteFile = false;
                    // console.log('Local DATA-Stage #1');
                    // console.log(this.loadedEntity);
                },
                error => {// Process error
                    // console.log('Local ERROR-Stage #1');
                    this.isLocalFileError = error;
                    if (error && this.localUrl) {
                        this.isRemoteFile = false;
                        // console.log(`Local load Error`);
                        // console.log(error);                        
                    }
                },
                () => { // Complete operation
                    // console.log(`Local DONE-Stage #1 ${this.remoteUrl}`);
                    this.isLocalFileDone = false;
                    if (this.loadedEntity && this.entitySchema) {
                        this.validationResult = this.validateSchemaByAjv(this.loadedEntity, this.entitySchema);
                        // console.log(this.validationResult)
                    }
                    this.doneLoadDateTime = Date.now();
                }
            );
    }

    private saveCat() {

    }

    public validateEntity(): FilePullResult<ResultType> {
        let validationAjv: AjvValidationResult;
        if (this.isRemoteFileDone || this.isLocalFileDone && !!this.entitySchema && !!this.loadedEntity) {
            validationAjv = this.isValidByAjv(this.loadedEntity, this.entitySchema);
        }
        this.validationResult = new FilePullResult<ResultType>(this.loadedEntity, validationAjv);
        return this.validationResult;
    }

    private validateSchemaByAjv(loadedEntity: ResultType, entitySchema: any): FilePullResult<ResultType> {
        let validationAjv: AjvValidationResult;

        if (!!entitySchema && !!loadedEntity) {
            console.log(loadedEntity);
            console.log(entitySchema);

            validationAjv = this.isValidByAjv(loadedEntity, entitySchema);
            console.log(`Schema validation: ${validationAjv.isValid}`);
            console.log(validationAjv.validationErrors);
        }
        this.validationResult = new FilePullResult<ResultType>(this.loadedEntity, validationAjv);
        return this.validationResult;
    }
}

/**
 * Async promise-resolving class for pulling in the JSON-Schema 
 * files for the Catalogs & Profiles into the users' browser
 *
 * @export 
 * @class SchemaFile
 * @extends {OsFileOperations}
 */
@Injectable({
    providedIn: 'root'
})
export class SchemaFile extends OsFileOperations {

    url: string;
    fallback_file: string;

    is_remote_done: boolean;
    is_local_done: boolean;
    is_remote_file: boolean;

    schema: any;

    remote_schema_error: any;
    local_schema_error: any;

    constructor(httpClient: HttpClient, storage: Storage, platform: Platform, url?: string, backup_file?: string,) {
        super(httpClient, storage, platform);
        //this.cat_schema_loader = new OscalSchemaFile<any>(httpClient, storage, platform);
        this.url = url;
        this.fallback_file = backup_file;

    }

    loadSchema(url?: string, backup_file?: string) {
        // const url = 'https://raw.githubusercontent.com/usnistgov/OSCAL/main/json/schema/oscal_catalog_schema.json';
        if (!url) {
            url = this.url;
        }
        if (!backup_file) {
            backup_file = this.fallback_file;
        }
        this.loadRemoteSchema(url);
    }

    // First State of the schema load
    private loadRemoteSchema(url: string) {
        this.getHttpEntity<any>(url)
            .subscribe(
                data => {
                    this.schema = data;
                    this.is_remote_file = true;
                    // console.log('DATA-Stage #1');
                    // console.log(this.cat_schema);
                },
                error => {// Process error
                    // console.log('ERROR-Stage #1');
                    this.remote_schema_error = error;
                    if (error) {
                        this.is_remote_file = false;
                        // console.log(`Remote load Error`);
                        console.log(error);
                        this.load_local_file_fallback(this.fallback_file);
                    }
                },
                () => { // Complete operation
                    // console.log(`DONE-Stage #1 ${this.url}`);
                    this.is_remote_done = true;
                    if (this.remote_schema_error && !this.is_remote_file && this.fallback_file) {
                        this.load_local_file_fallback(this.fallback_file);
                    }
                    this.doneLoadDateTime = Date.now();
                }
            );
    }
    private remote_schema_data_callback(data: any): any { }
    private remote_schema_error_callback(error: any) { }
    private remote_schema_done_callback() { }

    private load_local_file_fallback(backup_file?: string): void {
        // console.log('BEGIN-Stage #2');
        this.is_remote_file = false;
        if (this.remote_schema_error) {
            this.loadBackupSchema(this.fallback_file);
        }
    }

    // Second State of the schema load: as schema is slow changing - load locally saved schema
    private loadBackupSchema(localUrl: string) {
        // console.log('IN-IN-Stage #2');
        this.getHttpEntity<any>(localUrl)
            .subscribe(
                data => { // 
                    this.schema = data;
                    this.is_remote_file = true;
                    // console.log('DATA-Stage #2');
                    // console.log('Local File Fall-Back');
                    // console.log(this.cat_schema);
                },
                error => {// Process local fall-back file load error
                    this.local_schema_error = error;
                    if (this.local_schema_error) {
                        this.is_remote_file = false;
                        // console.log('ERROR-Stage #2');
                        // console.log(this.local_schema_error);
                        this.load_local_file_fallback(this.fallback_file);
                    }
                },
                () => { // Complete operation
                    this.is_local_done = true;
                    // console.log(`DONE-Stage #2 ${this.url}`);
                    this.doneLoadDateTime = Date.now();
                }
            );
    }
}
@Injectable({
    providedIn: 'root'
})
export class SchemaFile extends OsFileOperations {

    url: string;
    backup_file: string;

    is_remote_done: boolean;
    is_local_done: boolean;
    is_remote_file: boolean;

    cat_schema: any;

    remote_schema_error: any;
    local_schema_error: any;

    constructor(httpClient: HttpClient, storage: Storage, platform: Platform, url?: string, backup_file?: string,) {
        super(httpClient, storage, platform);
        //this.cat_schema_loader = new OscalSchemaFile<any>(httpClient, storage, platform);
        this.url = url;
        this.backup_file = backup_file;

    }

    loadSchema(url?: string, backup_file?: string) {
        // const url = 'https://raw.githubusercontent.com/usnistgov/OSCAL/main/json/schema/oscal_catalog_schema.json';
        if (!url) {
            url = this.url;
        }
        if (!backup_file) {
            backup_file = this.backup_file;
        }
        this.loadRemoteSchema(url);
    }

    // First State of the schema load
    private loadRemoteSchema(url: string) {
        this.getHttpEntity<any>(url)
            .subscribe(
                data => {
                    this.cat_schema = data;
                    this.is_remote_file = true;
                    // console.log('DATA-Stage #1');
                    // console.log(this.cat_schema);
                },
                error => {// Process error
                    // console.log('ERROR-Stage #1');
                    this.remote_schema_error = error;
                    if (error) {
                        this.is_remote_file = false;
                        // console.log(`Remote load Error`);
                        console.log(error);
                        this.load_local_file_fallback(this.backup_file);
                    }
                },
                () => { // Complete operation
                    // console.log('DONE-Stage #1');
                    this.is_remote_done = true;
                    if (this.remote_schema_error && !this.is_remote_file && this.backup_file) {
                        this.load_local_file_fallback(this.backup_file);
                    }
                }
            );
    }
    private remote_schema_data_callback(data: any): any { }
    private remote_schema_error_callback(error: any) { }
    private remote_schema_done_callback() { }

    private load_local_file_fallback(backup_file?: string): void {
        // console.log('BEGIN-Stage #2');
        this.is_remote_file = false;
        if (this.remote_schema_error) {
            this.loadBackupSchema(this.backup_file);
        }
    }

    // Second State of the schema load: as schema is slow changing - load locally saved schema
    private loadBackupSchema(localUrl: string) {
        // console.log('IN-IN-Stage #2');
        this.getHttpEntity<any>(localUrl)
            .subscribe(
                data => { // 
                    this.cat_schema = data;
                    this.is_remote_file = true;
                    // console.log('DATA-Stage #2');
                    // console.log('Local File Fall-Back');
                    // console.log(this.cat_schema);
                },
                error => {// Process local fall-back file load error
                    this.local_schema_error = error;
                    if (this.local_schema_error) {
                        this.is_remote_file = false;
                        // console.log('ERROR-Stage #2');
                        // console.log(this.local_schema_error);
                        this.load_local_file_fallback(this.backup_file);
                    }
                },
                () => { // Complete operation
                    this.is_local_done = true;
                    // console.log('DONE-Stage #2');
                }
            );
    }


}