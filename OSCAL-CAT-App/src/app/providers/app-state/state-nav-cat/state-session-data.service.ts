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
import { KnownOscalFilesService } from "../../oscal-files/known-files.service";


export enum NamedSessionNodes {
    SESSION_BRIEFS = 'OC:All-Briefs',
    ACTIVE_BRIEF = 'OC:Active-Brief',

    SAVED_SESSIONS = 'OC:All-Sessions',
    ACTIVE_SESSION_NAME = 'OC:Active-Session-Name',
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

    public name: string;
    public fullName?: string;
    public catType?: KnownCatalogNames;
    public originalIndexKF: number;
    public uuid: string;
    public sessionDataName: string;

    constructor(uuid: string, name: string, index: number) {
        this.setUuid(uuid);
        this.name = name;
        this.originalIndexKF = index;
    }


    private setUuid(uuid: string) {
        this.uuid = uuid;
        this.sessionDataName = SessionBrief.getSessionKeyName(this.uuid);
    }

    public getSessionDataName(): string {
        if (!this.sessionDataName) {
            this.sessionDataName = SessionBrief.getSessionKeyName(this.uuid);
        }
        return this.sessionDataName;
    }

    static getSessionKeyName(uuid: string): string {
        return `${uuid}:${NamedSessionNodes.SESSION_DATA}`;
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

    private static activeBrief: SessionBrief;       // The shallow init object to pull out session uuids
    static savedBriefs: Array<SessionBrief>;

    private static activeSessionName: string;       // The UUID-Session-Data format name of the session if exists 
    private static activeSessionUUID: string;
    private static activeSession: SessionData;      // The deeper version of the session with actual objects in it 


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

    getStoreUuidEntryName(uuid: string, namedNode: NamedSessionNodes) {
        return `${uuid}:${namedNode}`
    }

    getSessionName(uuid: string) {
        return `${uuid}:${NamedSessionNodes.SESSION_DATA}`;
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

    readActiveSessionName(): string {
        this.getKeyValueObject<SessionBrief>(NamedSessionNodes.ACTIVE_BRIEF)
            .then((data: SessionBrief) => {
                CurrentSessionData.activeSessionName = data.sessionDataName;
                return CurrentSessionData.activeSessionName;
            })
            .catch((error) => {
                console.log(
                    `Promise of the ` +
                    `NamedSessionNodes.ACTIVE_BRIEF:` +
                    `${NamedSessionNodes.ACTIVE_BRIEF}` +
                    ` is not found ${JSON.stringify(error)}`);
            })
        return undefined;
    }

    public setActiveSession(session: SessionData) {
        this.setKeyValueObject<SessionData>(session.sessionDataName, session)
            .then
            ((sessionData: SessionData) => {
                CurrentSessionData.activeSession = sessionData;
                CurrentSessionData.activeSessionUUID = sessionData.uuid;
                CurrentSessionData.activeSessionName = sessionData.sessionDataName;
            });
    }

    public getActiveSession(): SessionData {
        if (CurrentSessionData.activeSession) {
            return CurrentSessionData.activeSession;
        } else {
            var sessionID;
            // MAKE SURE THAT SESSION BRIEF EXISTS
            if (!CurrentSessionData.activeBrief) {
                CurrentSessionData.activeBrief = this.getActiveBrief();
            }
            if (CurrentSessionData.activeBrief) {
                sessionID = CurrentSessionData.activeBrief.sessionDataName
            } else if (CurrentSessionData.activeSessionName) {
                sessionID = CurrentSessionData.activeSessionName;
            } else if (CurrentSessionData.activeSessionUUID) {
                sessionID = this.getStoreUuidEntryName(
                    CurrentSessionData.activeSessionUUID,
                    NamedSessionNodes.SESSION_DATA)
            } else {
                sessionID = this.readActiveSessionName();
            }
            if (!!sessionID) {
                this.readActivateSession(sessionID);
            } else {
                console.log(`No active session nor Active Session UUID were found`);
            }
        }
        console.log(`SessionID: ${sessionID}`);
        console.log(CurrentSessionData.activeSession);
        return CurrentSessionData.activeSession;
    }

    private readActivateSession(id: string) {
        this.getKeyValueObject<SessionData>(id).then(
            (sessionData: SessionData) => {
                CurrentSessionData.activeSession = sessionData;
                CurrentSessionData.activeSessionUUID = sessionData.uuid;
                CurrentSessionData.activeSessionName = sessionData.sessionDataName;
            }
        ).catch(
            () => { console.log(`Could not read Session-Value ${id}`) }
        );
    }

    activateBrief(brief: SessionBrief) {
        // CurrentSessionData.activeBrief = brief;
        this.ActivateBriefState(brief);
        this.setKeyValueObject<SessionBrief>(
            NamedSessionNodes.ACTIVE_BRIEF, brief)
            .then(
                (brief) => {
                    this.ActivateBriefState(brief);
                    console.log(brief);
                });
    }

    public setActiveBrief(brief: SessionBrief) {
        this.setKeyValueObject<SessionBrief>(
            NamedSessionNodes.ACTIVE_BRIEF, brief)
            .then(
                (brief) => {
                    this.ActivateBriefState(brief);
                });
    }

    public getActiveBrief(): SessionBrief {
        if (CurrentSessionData.activeBrief) {
            return CurrentSessionData.activeBrief;
        } else {
            this.getKeyValueObject<SessionBrief>(NamedSessionNodes.ACTIVE_BRIEF)
                .then(
                    (brief) => {
                        this.ActivateBriefState(brief);
                        return brief;
                    }
                ).catch(
                    (error) => {
                        console.log(`Error reading the Active-Brief`);
                        console.log(error);
                    });
        }
        return CurrentSessionData.activeBrief;
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
            CurrentSessionData.activeBrief = brief;
            if (brief.uuid) {
                CurrentSessionData.activeSessionUUID = brief.uuid
                CurrentSessionData.activeSessionName = brief.sessionDataName;
            }
        }
    }

    public appendBriefToStore(brief: SessionBrief, activate: boolean = false) {
        CurrentSessionData.savedBriefs

    }


    private setEntry<Type>(nodeName: NamedSessionNodes, value: Type): void {

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

    public activateSession(brief: SessionBrief) {
        if (this.isKeyValuePresent(NamedSessionNodes.ACTIVE_BRIEF)
        ) {
            if (this.isKeyValuePresent(brief.sessionDataName)) {
                this.readActivateSession(brief.sessionDataName);
            } else {
                this.createNewActiveSession(brief, undefined);
            }
        } else {

        }
    }

    public createNewActiveSession(brief: SessionBrief, cat: Catalog) {
        const newSession = new SessionData(brief.uuid, brief.name, brief.originalIndexKF);
        if (!!cat) {
            newSession.catalog = cat;
        }
        this.setActiveSession(newSession);
    }

    public removeSession(uuid: string) {
        const sessionKeyName = SessionBrief.getSessionKeyName(uuid);
        if (this.isKeyValuePresent(sessionKeyName)) {
            this.removeItemByKey(sessionKeyName)
                .then(
                    (result) => {
                        console.log('Removing session from store');
                        console.log(result);
                    }
                ).catch(
                    (error) => {
                        console.log('Error while removing session from store');
                        console.log(error);
                    }
                );
        }

    }

    private activateNewSession(name: string, index: number): string {

        const uuid = this.getNewSessionUUID();
        const newSession = new SessionData(uuid, name, index);
        this.setActiveSession(newSession);
        return this.session_id;
    }

}


