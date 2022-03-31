import {
    ResponsibleParty, Address, DocumentIdentifier, PartyExternalIdentifier,
    PartyOrganizationOrPerson, PartyType, Property, Link, Location, Role, TelephoneNumber
} from './oscal-catalog.types';


export class OscalCatalogEmpties {


    public static getEmptyResponsibleParty(): ResponsibleParty {
        const emptyRP: ResponsibleParty = {
            partyUuids: new Array<string>(),
            roleID: '',
            props: undefined,
            remarks: undefined,
            links: undefined,

        };
        return emptyRP;
    }

    public static getEmptyString(): string {
        return '';
    }

    public static getEmptyPartyExternalIdentifier(): PartyExternalIdentifier {
        const emptyID: PartyExternalIdentifier = {
            id: '',
            scheme: '',
        }
        return emptyID;
    }


    public static getEmptyPhoneNumber(): TelephoneNumber {
        const emptyPhone: TelephoneNumber = {
            number: '',
            type: '',
        }
        return emptyPhone;
    }


    public static getEmptyPOoP(typeName?: string): PartyOrganizationOrPerson {
        console.log(`T-Name = ${typeName}`)
        const emptyPOoP: PartyOrganizationOrPerson = {
            name: '', // partyName: '',// Pre-Apr-6-2021
            shortName: '', // Optional
            uuid: '', // !! Must Have
            type: (typeName === 'Person' ? PartyType.Person : PartyType.Organization),  // !! Must Have
            addresses: new Array<Address>(),
            emailAddresses: new Array<string>(), // ['x@hotmail.org', 'yuod@getMaxListeners.com'], //
            externalIDS: new Array<PartyExternalIdentifier>(), // externalIDS: new Array<PersonalIdentifier>(), //
            links: new Array<Link>(),
            locationUuids: Array<string>(),
            memberOfOrganizations: Array<string>(),
            props: new Array<Property>(), // properties: new Array<Property>(), // Pre-Apr-6-2021
            remarks: '',
            telephoneNumbers: new Array<TelephoneNumber>(),
            // annotations: new Array<Annotation>(),//  Removed past Apr-6-2021
        }
        // Address push for testing how info flows into address
        /*
          emptyPOoP.addresses.push(
              {
                city: 'New York',
                country: 'Ours',
                addrLines: ['One', 'Two'], // postalAddress: ['One', 'Two'], // Pre Apr-6
                postalCode: '00000-0000',
                state: 'OK',
                type: 'Some',
              });
          */
        return emptyPOoP
    }

    public static getEmptyAddress(): Address {
        const emptyAddress: Address = {
            city: '',
            country: '',
            addrLines: ['', ''],  // new Array<string>(), //
            postalCode: '',
            state: '',
            type: '',
        }
        /*
        const emptyAddress: Address = {
        city: 'New Villa',
        country: 'Some Cool One',
        addrLines: ['SuperMan Inc0', '987654321 Krypton Avenue', 'Extra Info on the Block 1234', 'Some $#!+3'],  // new Array<string>(), //
        postalCode: '65431',
        state: 'Stateless',
        type: 'Special Type',
        };
        */
        return emptyAddress
    }

    /**
     * Generates empty document id
     *
     * @static
     * @returns {DocumentIdentifier}
     * @memberof OscalCatalogEmpties
     */
    public static getEmptyDocID(): DocumentIdentifier {
        const emptyDocId = {
            identifier: '',
            scheme: '',
        } as DocumentIdentifier
        return emptyDocId
    }

    /**
     * Generates empty Property for Catalog...
     *
     * @static
     * @returns {Property}
     * @memberof OscalCatalogEmpties
     */
    public static getEmptyProperty(): Property {
        const emptyProperty: Property = {
            class: undefined,
            name: '',
            ns: undefined,
            remarks: undefined,
            uuid: undefined,
            value: '',
        };
        return emptyProperty;
    }

    /**
     * Returns empty Link for Catalog
     *
     * @static
     * @returns {Link}
     * @memberof OscalCatalogEmpties
     */
    public static getEmptyLink(): Link {
        const emptyLink: Link = {
            href: '',
            mediaType: undefined,
            rel: undefined,
            text: undefined,
        };
        return emptyLink;
    }

    public static getEmptyLocation(): Location {
        const emptyLocation: Location = {
            address: OscalCatalogEmpties.getEmptyAddress(),
            emailAddresses: new Array<string>(),
            links: new Array<Link>(),
            props: new Array<Property>(),
            remarks: '',
            telephoneNumbers: new Array<TelephoneNumber>(),
            title: '',
            urls: new Array<string>(),
            uuid: '',
        };
        return emptyLocation;
    }


    public static getEmptyRole(): Role {
        const emptyRole: Role = {
            description: '', // undefined
            id: '',
            links: new Array<Link>(), // undefined
            props: new Array<Property>(), // undefined
            remarks: '', // undefined
            shortName: '', // undefined
            title: '',
        };
        return emptyRole;
    }


    public static getEmptyTelephoneNumber(): TelephoneNumber {
        const emptyTelephoneNumber: TelephoneNumber = {
            number: '',
            type: '',
        };
        return emptyTelephoneNumber;
    };

}
