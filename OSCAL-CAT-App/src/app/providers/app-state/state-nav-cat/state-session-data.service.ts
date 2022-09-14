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
import { Injectable } from "@angular/core";
import { Platform } from "@ionic/angular";
import { Storage } from '@ionic/storage';
import { v4 as UUIDv4 } from 'uuid';
import { KvServiceBase } from './state-kv-base.service';


import { TreeItemEntry, TreeNodeType } from './../app-tree/tree-elements';

import {
    Catalog,
    PublicationMetadata,
    Profile
} from "src/app/interfaces/oscal-types/oscal-catalog.types";
import { KnownCatalogNames, KnownOscalFileLocation } from "src/app/interfaces/known-locations";


export enum NamedSessionNodes {
    SAVED_SESSIONS = 'ALL-OSCAL-SESSIONS',
    URL_LOADED_FILES = 'PREVIOUSLY-LOADED-FILES',
    URL_LOADED_SCHEMAS = 'PREVIOUSLY-LOADED-SCHEMAS',
    ACTIVE_SESSION = 'OSCAL-CURRENT-SESSION',
    SAVED_ENTRIES = 'ALL-OSCAL-ENTRY-SESSION',
    ACTIVE_ENTIRE = 'OSCAL-CURRENT-ENTIRE-SESSION',
    // Suffixes for other
    SAVED_META = 'OSCAL-SAVED-META',
    SAVED_INCLUDE = 'OSCAL-SAVED-INCLUDES',
    SAVED_MODS = 'OSCAL-SAVED-MODS',
    SAVED_GROUPS = 'OSCAL-SAVED_GROUPS',
    OSCAL_CAT_SETTINGS = 'OSCAL-CAT-SETTINGS',
}

export class SessionBrief {
    public uuid: string;
    public name: string;
    public fullName?: string;
    public catType?: KnownCatalogNames;

    constructor(uuid: string, name: string) {
        this.uuid = uuid;
        this.name = name;
    }
}
export class SessionData extends SessionBrief {

    constructor(uuid: string, name: string, index: number) {
        super(uuid, name);
        this.index = index;
    }

    public knownCat?: KnownOscalFileLocation;
    public catalog?: Catalog;
    public profile?: Profile;

    public meta?: PublicationMetadata;

    public catTree?: TreeItemEntry;
    public proTree?: TreeItemEntry;
    public regroupTree?: TreeItemEntry;
    public index: number;
}

@Injectable({
    providedIn: 'root'
})
export class CurrentSessionData extends KvServiceBase {

    private static currentActiveEntry: SessionBrief;    // The shallow init object to pull out session uuids
    private static currentActiveSession: SessionData;   // The deeper version of the session with actual objects in it 
    private static currentSessionUUID: string;

    static sessionEntries: Array<SessionBrief>;

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

    getNewSessionUUID() {
        return UUIDv4();
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

    public set ActiveSession(session: SessionData) {
        this.setKeyValueObject<SessionData>(
            this.getStoreEntryName(session.uuid, NamedSessionNodes.ACTIVE_SESSION),
            session);
        CurrentSessionData.currentActiveSession = session;
        CurrentSessionData.currentSessionUUID = session.uuid;
    }

    public get ActiveSession(): SessionData {
        if (CurrentSessionData.currentActiveSession) {
            return CurrentSessionData.currentActiveSession;
        } else {
            var id;
            if (CurrentSessionData.currentSessionUUID) {
                id = this.getStoreEntryName(CurrentSessionData.currentSessionUUID, NamedSessionNodes.ACTIVE_SESSION)
            } else if (CurrentSessionData.currentActiveSession && CurrentSessionData.currentActiveSession.uuid) {
                id = this.getStoreEntryName(CurrentSessionData.currentActiveSession.uuid, NamedSessionNodes.ACTIVE_SESSION)
            }
            this.getKeyValueObject<SessionData>(id).then(
                (X: SessionData) => { CurrentSessionData.currentActiveSession = X; }
            ).catch(
                () => { console.log(`Could not read Session-Value ${id}`) }
            );
        }
    }


    setEntry<Type>(nodeName: NamedSessionNodes, value: Type): void {

    }

    getStoreEntryName(uuid: string, namedNode: NamedSessionNodes) {
        return `${uuid}--${namedNode}`
    }

    getEntry<Type>(uuid: string, namedNode: NamedSessionNodes): Type {
        const storeEntryName = this.getStoreEntryName(uuid, namedNode)
        this.getKeyValueObject<Type>(storeEntryName)
            .then((data: Type) => {
                return data;
            })
            .catch((error) => {
                console.log(
                    `Promise of the ` +
                    ` ${storeEntryName}:` +
                    ` is not complete ${JSON.stringify(error)}`);
            })
        return undefined;
    }

    activateNewSession(name: string, index: number): string {

        const uuid = this.getNewSessionUUID();
        const newSession = new SessionData(uuid, name, index);
        this.ActiveSession = newSession
        return this.session_id
    }

}


