import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { v4 as UUIDv4 } from 'uuid';

import { KvServiceBase } from './state-kv-base.service';



export enum SessionNodes {
    SAVED_SESSION = 'OSCAL-SAVED-SESSIONS',
    CURRENT_SESSION = 'OSCAL-CURRENT-SESSION',
    SAVED_META = 'OSCAL-SAVED-META',
    SAVED_INCLUDE = 'OSCAL-SAVED-INCLUDES',
    SAVED_MODS = 'OSCAL-SAVED-MODS',
    SAVED_GROUPS = 'OSCAL-SAVED_GROUPS',
}

export class SessionData {
    public uuid: string;
    public name: string;


}


@Injectable({
    providedIn: 'root'
})
export class CurrentSessionData extends KvServiceBase {
    session_id: string;
    savedSessions: string[] = [];
    storage: Storage;

    constructor(
        public theStorage: Storage,
        public platform: Platform,
    ) {
        super(theStorage, platform);
        this.init();
    }

    async init() {
        // Must make sure that database is created
        const store = await this.storage.create();
        this.storage = store;
    }

    initNewSession(): string {
        this.session_id = UUIDv4();
        return this.session_id
    }

    getSavedSessions(): Array<string> {
        return undefined;
    }


}


