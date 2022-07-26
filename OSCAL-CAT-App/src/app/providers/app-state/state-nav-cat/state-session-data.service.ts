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


