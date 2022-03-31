import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { v4 as UUIDv4 } from 'uuid';

import { KvServiceBase } from './state-kv-base.service';

const saved_sessions = 'oscal-saved-sessions';
const current_session = 'oscal-current-session';

const saved_meta_root = 'oscal-saved-meta';
const saved_include_root = 'oscal-saved-includes';
const saved_mods_root = 'oscal-saved-mods';



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