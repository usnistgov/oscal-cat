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

@Injectable({
    providedIn: 'root'
})
export class OscalRemoteFile<ResultType> extends OsFileOperations /* extends KvServiceBase */ {

    session_id: string;
    httpFileData: any;

    loadedEntity: ResultType;
    entitySchema: any;
    isEntityLoadData: boolean;
    isEntityLoadError: boolean;
    isEntityLoadDone: boolean;
    result: FilePullResult<ResultType>;

    constructor(
        public httpClient: HttpClient,
        public storage: Storage,
        public platform: Platform,
    ) {
        super(httpClient, storage, platform);
    }


    /**
     * Funnel method for all types (Catalog/Profile) HTTP pull from online sources
     *
     * @template ResultType - Type of the object that will return back
     * @param {string} url - URL for the object to pull
     * @param {*} entitySchema - Schema 
     * @returns {FilePullResult<ResultType>} Result-Digest object
     * @memberof OsFileOperations
     */
    getValidatedObjectFromUrl(url: string, entitySchema: any, returnOnDone: returnResultDelegate<ResultType>): void {
        this.entitySchema = entitySchema

        this.getHttpEntity<ResultType>(url)
            .subscribe(
                data => { // On next operation
                    this.loadedEntity = data;
                    // console.log(JSON.stringify(data));
                    this.isEntityLoadData = true;
                    console.log(data);
                    console.log(`Data-Lambda`);
                },
                error => {// Process error
                    console.log(`Error reading URL:${url}:\n\t${error}`);
                    console.log(error);
                    // Here fallback to the local resource
                    this.isEntityLoadError = false;
                    console.log(`Error-Lambda`);
                },
                () => { // Complete operation
                    this.isEntityLoadDone = true;
                    console.log(`Done-Lambda`);
                    let returnResult: FilePullResult<ResultType> = this.validateSchemaByAjv(this.loadedEntity, this.entitySchema);
                    console.log(returnResult)
                    returnOnDone(this.result);
                }
            )
        return
    }

    publicValidateEntity(): FilePullResult<ResultType> {
        let validationAjv: AjvValidationResult;
        if (this.isEntityLoadDone && !!this.entitySchema && !!this.loadedEntity) {
            console.log(this.loadedEntity);
            console.log(this.entitySchema);

            validationAjv = this.isValidByAjv(this.loadedEntity, this.entitySchema);
        }
        this.result = new FilePullResult<ResultType>(this.loadedEntity, validationAjv);
        return this.result;
    }

    private validateSchemaByAjv(loadedEntity: ResultType, entitySchema: any): FilePullResult<ResultType> {
        let validationAjv: AjvValidationResult;

        if (this.isEntityLoadDone && !!entitySchema && !!loadedEntity) {
            console.log(loadedEntity);
            console.log(entitySchema);

            validationAjv = this.isValidByAjv(loadedEntity, entitySchema);
            console.log(`Schema validation: ${validationAjv.isValid}`);
            console.log(validationAjv.validationErrors);
        }
        this.result = new FilePullResult<ResultType>(this.loadedEntity, validationAjv);
        return this.result;
    }
}


@Injectable({
    providedIn: 'root'
})
export class OscalSchemaFile<ResultType> extends OsFileOperations /* extends KvServiceBase */ {
    lastLoaded: Date;
    originUrl: string;
    timeLoadStart: number;
    timeLoadEnd: number;

    delegateHandleData: (data: ResultType) => ResultType;
    delegateHandleError: (error: any) => void;

    loadedSchema: any;
    loadError: any;

    isLoadOK: boolean;
    isLoadDone: boolean;

    constructor(
        public httpClient: HttpClient,
        public storage: Storage,
        public platform: Platform,
    ) {
        super(httpClient, storage, platform);
    }

    loadCatSchema(name: string, url: string) {
        // const url = 'https://raw.githubusercontent.com/usnistgov/OSCAL/main/json/schema/oscal_catalog_schema.json'
        this.getHttpEntity<any>(url)
            .subscribe(
                data => { this.getCatSchema(data); },
                error => {// Process error
                    console.log(`Error reading URL:${url}:\n\t${error}`);
                    // Here fallback to the local resource
                    this.isLoadOK = false;
                    this.loadError = error;
                },
                () => { // Complete operation
                    this.isLoadDone = true;
                }
            );
    }

    setDataDelegate(dataHandler: (data: ResultType) => ResultType) {
        this.delegateHandleData = dataHandler;
    }

    setErrorDelegate(dataHandler: (error: any) => void) {
        this.delegateHandleError = dataHandler;
    }

    getCatSchema(data: ResultType): ResultType {
        if (this.delegateHandleData) {
            const extraData = this.delegateHandleData(data);
            // this.loadedSchema = extraData;
            console.log(extraData);
        } //Possibly Else
        console.log(data);
        console.log(`Loaded Schema`);
        this.loadedSchema = data;
        this.isLoadOK = true;
        return this.loadedSchema
    }

}
