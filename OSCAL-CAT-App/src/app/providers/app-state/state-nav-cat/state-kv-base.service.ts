import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class KvServiceBase {

    constructor(
        public storage: Storage,
        public platform: Platform,
        //  private httpClient: HttpClient,
    ) {
        // console.log(`Platform: ${this.platform}; Ready: ${this.platform.ready()}`);
        this.platform.ready().then(
            () => { }).then();
    }

    /**
     * @method @async setKeyValueObject
     * @param {string} keyValue: the Key to persist
     * @param {*} dataValue: the Value to persist
     * @returns {Promise<any>}
     * @memberof KvServiceBase
     */
    async setKeyValueObject<T>(keyValue: string, dataValue: T): Promise<any> {
        // Pack up the object from JSON to Stringified version
        console.log(dataValue);
        let strValue = '';
        if (dataValue) {
            strValue = JSON.stringify(dataValue);
            console.log(`Saving Key:${keyValue}\nas Str:${strValue}`)
        }
        return await this.storage.set(keyValue, strValue);
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


    async setKeyValueString(keyValue: string): Promise<string> {
        const theValue = await this.storage.get(keyValue);
        return theValue;
    }

    async getKeyValue(keyValue: string): Promise<string> {
        const theValue = await this.storage.get(keyValue);
        return theValue;
    }


    async isKeyValue(keyValue: string): Promise<boolean> {
        const value = await this.storage.get(keyValue);
        console.log(`IS-the-Key:${keyValue}={Value:${value}}`);
        return !!value;
    }

}
