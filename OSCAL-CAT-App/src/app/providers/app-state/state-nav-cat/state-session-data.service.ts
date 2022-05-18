import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { v4 as UUIDv4 } from 'uuid';
import { KvServiceBase } from './state-kv-base.service';


import { TreeNodeType } from './../app-tree/tree-elements';

import {
    Catalog,
    PublicationMetadata
} from "src/app/interfaces/oscal-types/oscal-catalog.types";
import { KnownOscalFileLocation } from "src/app/interfaces/known-locations";


export enum NamedSessionNodes {
    SAVED_SESSIONS = 'OSCAL-SAVED-SESSIONS',
    ACTIVE_SESSION = 'OSCAL-CURRENT-SESSION',
    SAVED_META = 'OSCAL-SAVED-META',
    SAVED_INCLUDE = 'OSCAL-SAVED-INCLUDES',
    SAVED_MODS = 'OSCAL-SAVED-MODS',
    SAVED_GROUPS = 'OSCAL-SAVED_GROUPS',
}

export class SessionData {
    public uuid: string;
    public name: string;
    public fullName?: string;
    public knownCat?: KnownOscalFileLocation;

    public catalog?: Catalog;

    public meta?: PublicationMetadata;

    public catTree?: TreeNodeType;
    public proTree?: TreeNodeType;
    public regroupTree?: TreeNodeType;

}






@Injectable({
    providedIn: 'root'
})
export class CurrentSessionData extends KvServiceBase {
    static currentActiveSession: SessionData;
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
        this.getKeyValueObject<Array<SessionData>>(NamedSessionNodes.SAVED_SESSIONS)
            .then((sessions: Array<SessionData>) => {
                return sessions;
            })
            .catch((error) => {
                console.log(`Promise of the sessions is not found ${JSON.stringify(error)}`)
            })
        return undefined;
    }

    readActiveSession(): SessionData {
        this.getKeyValueObject<SessionData>(NamedSessionNodes.ACTIVE_SESSION)
            .then((data: SessionData) => {
                CurrentSessionData.currentActiveSession = data;
                return data;
            })
            .catch((error) => {
                console.log(
                    `Promise of the ` +
                    `NamedSessionNodes.ACTIVE_SESSION:` +
                    `${NamedSessionNodes.ACTIVE_SESSION}` +
                    ` is not found ${JSON.stringify(error)}`);
            })
        return undefined;
    }

    saveActiveSession(session: SessionData) {
        this.setKeyValueObject<SessionData>(
            NamedSessionNodes.ACTIVE_SESSION, session);
    }

    getActiveSession(): SessionData {
        if (CurrentSessionData.currentActiveSession) {
            return CurrentSessionData.currentActiveSession;
        } else {
            return this.readActiveSession();
        }
    }




}


