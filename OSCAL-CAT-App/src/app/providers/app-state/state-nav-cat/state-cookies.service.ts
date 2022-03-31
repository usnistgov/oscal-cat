import { DOCUMENT } from '@angular/common';

export enum TimeUnit {
    Minutes = 0x01,
    Hours = 0x02,
    Days = 0x04,
    Weeks = 0x08,
    Months = 0x0f,
    Years = 0x10,
}


export class CookiesHandler {

    constructor() { }

    setToExpireIn(delta: number, unit?: TimeUnit): string {
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

    setCookieForDays(cookieName: string, cookieValue: string, cookieExpirationDays: number = 60) {
        const expiration = (cookieExpirationDays > 0) ? this.setToExpireIn(cookieExpirationDays) : this.setToExpireIn(60);
        document.cookie = `${cookieName}=${cookieValue}; expires=${expiration}; path=/`;
    }

    private setCookieForExpiration(cookieName: string, cookieValue: string, cookieExpiration: string = null) {
        const expiration = cookieExpiration || this.setToExpireIn(60);
        document.cookie = `${cookieName}=${cookieValue}; expires=${expiration}; path=/`;
    }

    deleteCookie(cookieName: string): void {
        const pastExpiration = this.setToExpireIn(-60);
        document.cookie = `${cookieName}=; expires=${pastExpiration}; path=/`;
    }

    getCookie(cookieName: string): string {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${cookieName}=`);
        if (parts.length === 2) {
            return parts.pop().split(';').shift();
        } else {
            return '';
        }
    }

}
