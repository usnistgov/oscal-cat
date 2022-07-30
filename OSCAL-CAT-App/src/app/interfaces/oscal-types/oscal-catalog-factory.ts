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
import {
    ResponsibleParty, Address, DocumentIdentifier, PartyExternalIdentifier,
    PartyOrganizationOrPerson, PartyType, Property, Link, Location, Role,
    TelephoneNumber, Control, Part, Parameter, ControlGroup, Guideline, Constraint, Selection, ParameterCardinality,
} from './oscal-catalog.types';


export class OscalCatalogEmpties {

    static getEmptyControl(): Control {
        const emptyControl: Control = {
            title: '',
            id: '',
            class: '',
            controls: new Array<Control>(),
            links: new Array<Link>(),
            params: new Array<Parameter>(),
            parts: new Array<Part>(),
            props: new Array<Property>(),
        }
        return emptyControl;
    }

    static getEmptyControlGroup(): ControlGroup {
        const emptyControlGroup: ControlGroup = {
            title: '',
            id: '',
            class: '',
            controls: new Array<Control>(),
            links: new Array<Link>(),
            params: new Array<Parameter>(),
            parts: new Array<Part>(),
            props: new Array<Property>(),
            groups: new Array<ControlGroup>(),
        }
        return emptyControlGroup;
    }

    static getEmptyPart(): Part {
        const emptyPart: Part = {
            id: '',
            ns: '',
            name: '',

            class: '',
            prose: '',
            title: '',

            links: new Array<Link>(),
            parts: new Array<Part>(),
            props: new Array<Property>(),
        }
        return emptyPart;
    }

    static getEmptyParameter(): Parameter {
        const emptyPart: Parameter = {
            class: '',
            dependsOn: '',
            id: '',
            label: '',
            remarks: '',
            usage: '',

            values: Array<string>(),
            guidelines: new Array<Guideline>(),
            constraints: new Array<Constraint>(),

            links: new Array<Link>(),
            props: new Array<Property>(),
            select: OscalCatalogEmpties.getEmptySelection(),
        }
        return emptyPart;
    }

    static getEmptySelection(): Selection {
        const emptySelection: Selection = {
            choice: Array<string>(),
            howMany: ParameterCardinality.One
        }
        return emptySelection;
    }



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

    /**
     * Produces empty Person-Organization or Party POoP
     * @static
     * @param {string} [typeName]
     * @returns {PartyOrganizationOrPerson}
     * @memberof OscalCatalogEmpties
     */
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
        // Address push enable for for testing how info flows into address
        /*
          emptyPOoP.addresses.push(
              {
                city: 'New York',
                country: 'US',
                addrLines: ['One Line', 'Two Intersection'], // postalAddress: ['One', 'Two'], // Pre Apr-6
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
        city: 'New Village',
        country: 'US',
        addrLines: ['SuperMan Inc0', 
                    '987654321 Krypton Avenue', 
                    'Extra Info on the Block 1234', 
                    'Some More Info'],  // new Array<string>(), //
        postalCode: '74547',
        state: 'OK',
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
    }

}
