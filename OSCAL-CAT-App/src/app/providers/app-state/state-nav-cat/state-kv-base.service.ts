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
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class KvServiceBase {
    isReady: boolean = false;
    constructor(
        public storage: Storage,
        public platform: Platform,
        //  private httpClient: HttpClient,
    ) {
        // console.log(`Platform: ${this.platform}; Ready: ${this.platform.ready()}`);
        this.platform.ready().then(
            () => {
                this.createStorage();
            }).then(
                () => this.isReady = true);
    }


    async createStorage() {
        // Must make sure that database is created
        const store = await this.storage.create();
        this.storage = store;
        return store
    }

    /**
     * @method @async setKeyValueObject
     * @param {string} key: the Key to persist
     * @param {*} value: the Value to persist
     * @returns {Promise<any>}
     * @memberof KvServiceBase
     */
    async setKeyValueObject<T>(key: string, value: T): Promise<any> {
        if (key) {
            // Pack up the object from JSON to Stringified version
            console.log(`Key`);
            console.log(key);
            console.log(`Value`);
            console.log(value);
            let strValue = '';
            if (value) {
                strValue = JSON.stringify(value);
                console.log(`Saving Key:${key}\nas Str:${strValue}`)
            }
            return await this.storage.set(key, strValue);
        }
    }

    async setKeyValueString(key: string, value: string): Promise<string> {
        let strValue = '';
        if (value) {
            strValue = JSON.stringify(value);
            console.log(`Saving Key:${key}\nas Str:${value}`)
        }
        return await this.storage.set(key, strValue);
    }


    async getKeyValueObject<T>(keyValue: string): Promise<T> {
        const theValue = await this.storage.get(keyValue);
        let returnValue: T;
        try {
            returnValue = JSON.parse(theValue);
        } catch (error) {
            console.log(`The error:${error} prevented parsing out storage\nFor the Key:[${keyValue}] `)
        } finally {
            return returnValue;
        }
    }




    async getKeyValue(keyValue: string): Promise<string> {
        const theValue = await this.storage.get(keyValue);
        return theValue;
    }


    async isKeyValuePresent(keyValue: string): Promise<boolean> {
        const value = await this.storage.get(keyValue);
        // console.log(`IS-the-Key:${keyValue}={Value:${value}}`);
        return !!value;
    }

}
