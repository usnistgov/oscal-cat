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
import { DOCUMENT } from '@angular/common';
import { Injectable, Type } from '@angular/core';

export enum TimeUnit {
    Minutes = 0x01,
    Hours = 0x02,
    Days = 0x04,
    Weeks = 0x08,
    Months = 0x0f,
    Years = 0x10,
}

export class CookiePersistedSettings {
    title: string;
    toolTip: string;
    saveButtonTitle: string;
    unitName?: string;

    cookieName: string;
    expirationDays?: number;
    valueUnit?: string | undefined;
    value?: string | number | boolean;
    firstValue: string | number | boolean;
}


@Injectable({
    providedIn: 'root'
})
export class CookiesHandlerService {

    private static settingCookies: Array<CookiePersistedSettings> = [
        {
            cookieName: 'cat-expiration-hours',
            expirationDays: 180,
            firstValue: 8,
            value: 8,

            title: 'Offer to Update Catalogs, Profiles, and Schemas in:',
            toolTip: '',
            saveButtonTitle: 'Save Expiration Interval',
            unitName: 'hours',
        },
        {
            cookieName: 'cat-is-demo-flag',
            expirationDays: 180,
            firstValue: false,
            value: true,

            title: 'Extend Functionality in Meta for Demo:',
            toolTip: 'Extends Demo Functionality to save Typing',
            saveButtonTitle: 'Save Demo Flag',
        },
    ];


    constructor() {
        this.refreshCookies();
    }

    refreshCookies() {
        CookiesHandlerService.settingCookies.forEach(
            (info: CookiePersistedSettings) => {
                const str_value = this.getCookieString(info.cookieName);
                if (str_value != '') {
                    console.log(`Found cookie ${info.cookieName} = [${str_value}]`);
                    switch (typeof (info.firstValue)) {
                        case ('number'):
                            info.value = Number(str_value);
                        case ('boolean'):
                            info.value = Boolean(str_value);
                        default:
                            info.value = str_value;
                    }
                } else {
                    console.log(`no cookie ${info.cookieName}`);
                    info.value = info.firstValue;
                    this.setCookieForDays(info.cookieName, info.value, info.expirationDays);
                }
            }
        )
    }

    getSettings(): Array<CookiePersistedSettings> {
        return CookiesHandlerService.settingCookies;
    }

    private setToExpireIn(delta: number, unit?: TimeUnit): string {
        const time2Expire = new Date();
        switch (unit) {
            case TimeUnit.Minutes:
                time2Expire.setTime(time2Expire.getTime() + delta * (60 * 1000));
                break;
            case TimeUnit.Hours:
                time2Expire.setTime(time2Expire.getTime() + delta * (60 * 60 * 1000));
                break;
            case TimeUnit.Weeks:
                time2Expire.setTime(time2Expire.getTime() + delta * (7 * 24 * 60 * 60 * 1000));
                break;
            case TimeUnit.Months: // Approximating a Month by 30 Days
                time2Expire.setTime(time2Expire.getTime() + delta * (30 * 24 * 60 * 60 * 1000));
                break;
            case TimeUnit.Years:
                time2Expire.setTime(time2Expire.getTime() + delta * + (365 * 24 * 60 * 60 * 1000));
                break;
            default: // Default Unit is Days
                time2Expire.setTime(time2Expire.getTime() + delta * (24 * 60 * 60 * 1000));
                break;
        }
        return time2Expire.toUTCString();
    }

    private setCookieForDays(cookieName: string, cookieValue: string | number | boolean, cookieExpirationDays = 180) {
        const expiration = (cookieExpirationDays > 0) ? this.setToExpireIn(cookieExpirationDays) : this.setToExpireIn(60);
        document.cookie = `${cookieName}=${cookieValue}; expires=${expiration}; path=/`;
    }

    private setCookieForExpiration(cookieName: string, cookieValue: string | number | boolean, cookieExpiration: string = null) {
        const expiration = cookieExpiration || this.setToExpireIn(180);
        const savedCookieValue = JSON.stringify(cookieValue);
        document.cookie = `${cookieName}=${savedCookieValue}; expires=${expiration}; path=/`;

    }

    private deleteCookie(cookieName: string): void {
        const pastExpiration = this.setToExpireIn(-60);
        document.cookie = `${cookieName}=; expires=${pastExpiration}; path=/`;
    }

    private getCookieString(cookieName: string): string {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${cookieName}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        } else {
            return '';
        }
    }

    getCookieValue(info: CookiePersistedSettings): string | number | boolean {
        const str_value = this.getCookieString(info.cookieName);
        if (str_value != '') {
            switch (typeof (info.firstValue)) {
                case ('number'):
                    info.value = Number(str_value);
                case ('boolean'):
                    info.value = Boolean(str_value);
                default:
                    info.value = str_value;
            }
        }
        return info.value
    }

    setCookieValue(info: CookiePersistedSettings) {
        info.value = info.firstValue;
        this.deleteCookie(info.cookieName);
        this.setCookieForDays(info.cookieName, info.value, info.expirationDays);
        console.log(this.getCookieValue(info));
        this.refreshCookies()
        console.log(`Setting ${info.cookieName}=${info.value}`);
        console.log(CookiesHandlerService.settingCookies);
    }

}
