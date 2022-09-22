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
    SESSION_BRIEFS = 'OC:All-Briefs',
    ACTIVE_BRIEF = 'OC:Active-Brief',

    SAVED_SESSIONS = 'OC:All-Sessions',
    ACTIVE_SESSION = 'OC:Active-Session',
    SESSION_DATA = 'Session-Data',

    URL_LOADED_FILES = 'OC:Loaded-Files',
    URL_LOADED_SCHEMAS = 'OC:Loaded-Schemas',
    // Suffixes for other
    SAVED_META = 'OC:Meta',
    SAVED_INCLUDE = 'OC:Includes',
    SAVED_MODS = 'OC:Mods',
    SAVED_GROUPS = 'OC:Re-Groups',
    OSCAL_CAT_SETTINGS = 'OC:App-Settings',
}

export class SessionBrief {
    public uuid: string;
    public name: string;
    public fullName?: string;
    public catType?: KnownCatalogNames;
    public originalIndexKF: number;

    constructor(uuid: string, name: string, index: number) {
        this.uuid = uuid;
        this.name = name;
        this.originalIndexKF = index;
    }

}
export class SessionData extends SessionBrief {

    constructor(uuid: string, name: string, index: number) {
        super(uuid, name, index);
        this.originalIndexKF = index;
    }



    public knownCat?: KnownOscalFileLocation;
    public catalog?: Catalog;
    public profile?: Profile;

    public meta?: PublicationMetadata;

    public catTree?: TreeItemEntry;
    public proTree?: TreeItemEntry;
    public regroupTree?: TreeItemEntry;

}

@Injectable({
    providedIn: 'root'
})
export class CurrentSessionData extends KvServiceBase {

    private static currentActiveBrief: SessionBrief;    // The shallow init object to pull out session uuids
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
            this.getStoreUuidEntryName(session.uuid, NamedSessionNodes.ACTIVE_SESSION), session)
            .then
            ((data: SessionData) => {
                CurrentSessionData.currentActiveSession = data;
                CurrentSessionData.currentSessionUUID = data.uuid;

            });
    }

    public get ActiveSession(): SessionData {
        if (CurrentSessionData.currentActiveSession) {
            return CurrentSessionData.currentActiveSession;
        } else {
            var id;
            if (CurrentSessionData.currentSessionUUID) {
                id = this.getStoreUuidEntryName(
                    CurrentSessionData.currentSessionUUID,
                    NamedSessionNodes.ACTIVE_SESSION)
            } else if (CurrentSessionData.currentActiveSession && CurrentSessionData.currentActiveSession.uuid) {
                id = this.getStoreUuidEntryName(
                    CurrentSessionData.currentActiveSession.uuid,
                    NamedSessionNodes.ACTIVE_SESSION)
            }
            this.getKeyValueObject<SessionData>(id).then(
                (X: SessionData) => { CurrentSessionData.currentActiveSession = X; }
            ).catch(
                () => { console.log(`Could not read Session-Value ${id}`) }
            );
        }
    }

    activateBrief(brief: SessionBrief) {
        this.ActiveBrief = brief;
    }

    public set ActiveBrief(brief: SessionBrief) {
        this.setKeyValueObject<SessionBrief>(
            NamedSessionNodes.ACTIVE_BRIEF, brief)
            .then(
                (brief) => {
                    this.ActivateBriefState(brief);
                });
    }

    public get ActiveBrief(): SessionBrief {
        if (CurrentSessionData.currentActiveBrief) {
            return CurrentSessionData.currentActiveBrief;
        } else {
            this.getKeyValueObject<SessionBrief>(NamedSessionNodes.ACTIVE_BRIEF)
                .then(
                    (brief) => {
                        this.ActivateBriefState(brief);
                    }
                ).catch(
                    (error) => {
                        console.log(`Error reading the Active-Brief`);
                        console.log(error);
                    });
        }

    }

    public getBriefByUUID(uuid: string, setAsActive: boolean = false): SessionBrief {
        let brief: SessionBrief;
        if (setAsActive) {
            this.ActivateBriefState(brief);
        }
        return
    }

    private ActivateBriefState(brief: SessionBrief) {
        if (brief) {
            CurrentSessionData.currentActiveBrief = brief;
            if (brief.uuid) {
                CurrentSessionData.currentSessionUUID = brief.uuid
            }
        }
    }

    private



    setEntry<Type>(nodeName: NamedSessionNodes, value: Type): void {

    }

    getStoreUuidEntryName(uuid: string, namedNode: NamedSessionNodes) {
        return `${uuid}-${namedNode}`
    }

    getEntry<Type>(uuid: string, namedNode: NamedSessionNodes): Type {
        const storeEntryName = this.getStoreUuidEntryName(
            uuid,
            namedNode
        );
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


