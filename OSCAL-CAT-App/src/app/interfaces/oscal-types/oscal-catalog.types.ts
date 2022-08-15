// To parse this data:
//
//   import { Convert, Result } from "./file";
//
//   const result = Convert.toResult(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Result {
    catalog?: Catalog;
    profile?: Profile;
    componentDefinition?: ComponentDefinition;
    systemSecurityPlan?: SystemSecurityPlanSSP;
    assessmentPlan?: SecurityAssessmentPlanSAP;
    assessmentResults?: SecurityAssessmentResultsSAR;
    planOfActionAndMilestones?: PlanOfActionAndMilestonesPOAM;
}

/**
 * An assessment plan, such as those provided by a FedRAMP assessor.
 */
export interface SecurityAssessmentPlanSAP {
    assessmentAssets?: AssessmentAssets;
    assessmentSubjects?: SubjectOfAssessment[];
    backMatter?: BackMatter;
    importSSP: ImportSystemSecurityPlan;
    /**
     * Used to define data objects that are used in the assessment plan, that do not appear in
     * the referenced SSP.
     */
    localDefinitions?: AssessmentPlanLocalDefinitions;
    metadata: PublicationMetadata;
    reviewedControls: ReviewedControlsAndControlObjectives;
    tasks?: Task[];
    /**
     * Used to define various terms and conditions under which an assessment, described by the
     * plan, can be performed. Each child part defines a different type of term or condition.
     */
    termsAndConditions?: AssessmentPlanTermsAndConditions;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this assessment plan in this or other OSCAL instances. The locally defined
     * UUID of the assessment plan can be used to reference the data item locally or globally
     * (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject, which
     * means it should be consistently used to identify the same subject across revisions of the
     * document.
     */
    uuid: string;
}

/**
 * Identifies the assets used to perform this assessment, such as the assessment team,
 * scanning tools, and assumptions.
 */
export interface AssessmentAssets {
    assessmentPlatforms: AssessmentPlatform[];
    components?: AssessmentAssetsComponent[];
}

/**
 * Used to represent the toolset used to perform aspects of the assessment.
 */
export interface AssessmentPlatform {
    links?: Link[];
    props?: Property[];
    remarks?: string;
    /**
     * The title or name for the assessment platform.
     */
    title?: string;
    usesComponents?: UsesComponent[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this assessment platform elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the assessment platform can be used to reference the data item
     * locally or globally (e.g., in an imported OSCAL instance). This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid: string;
}

/**
 * A reference to a local or remote resource
 */
export interface Link {
    /**
     * A resolvable URL reference to a resource.
     */
    href: string;
    /**
     * Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) Media
     * Types Registry.
     */
    mediaType?: string;
    /**
     * Describes the type of relationship provided by the link. This can be an indicator of the
     * link's purpose.
     */
    rel?: string;
    /**
     * A textual label to associate with the link, which may be used for presentation in a tool.
     */
    text?: string;
}

/**
 * An attribute, characteristic, or quality of the containing object expressed as a
 * namespace qualified name/value pair. The value of a property is a simple scalar value,
 * which may be expressed as a list of values.
 */
export interface Property {
    /**
     * A textual label that provides a sub-type or characterization of the property's name. This
     * can be used to further distinguish or discriminate between the semantics of multiple
     * properties of the same object with the same name and ns.
     */
    class?: string;
    /**
     * A textual label that uniquely identifies a specific attribute, characteristic, or quality
     * of the property's containing object.
     */
    name: string;
    /**
     * A namespace qualifying the property's name. This allows different organizations to
     * associate distinct semantics with the same name.
     */
    ns?: string;
    remarks?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this defined property elsewhere in this or other OSCAL instances. This UUID
     * should be assigned per-subject, which means it should be consistently used to identify
     * the same subject across revisions of the document.
     */
    uuid?: string;
    /**
     * Indicates the value of the attribute, characteristic, or quality.
     */
    value: string;
}

/**
 * The set of components that are used by the assessment platform.
 */
export interface UsesComponent {
    /**
     * A machine-oriented identifier reference to a component that is implemented as part of an
     * inventory item.
     */
    componentUUID: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleParties?: ResponsibleParty[];
}

/**
 * A reference to a set of organizations or persons that have responsibility for performing
 * a referenced role in the context of the containing object.
 */
export interface ResponsibleParty {
    links?: Link[];
    partyUuids: string[];
    props?: Property[];
    remarks?: string;
    /**
     * A human-oriented identifier reference to roles served by the user.
     */
    roleID: string;
}

/**
 * A defined component that can be part of an implemented system.
 */
export interface AssessmentAssetsComponent {
    /**
     * A description of the component, including information about its function.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    protocols?: ServiceProtocolInformation[];
    /**
     * A summary of the technological or business purpose of the component.
     */
    purpose?: string;
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    /**
     * Describes the operational status of the system component.
     */
    status: ComponentStatus;
    /**
     * A human readable name for the system component.
     */
    title: string;
    /**
     * A category describing the purpose of the component.
     */
    type: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this component elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the component can be used to reference the data item locally or globally
     * (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject, which
     * means it should be consistently used to identify the same subject across revisions of the
     * document.
     */
    uuid: string;
}

/**
 * Information about the protocol used to provide a service.
 */
export interface ServiceProtocolInformation {
    /**
     * The common name of the protocol, which should be the appropriate "service name" from the
     * IANA Service Name and Transport Protocol Port Number Registry.
     */
    name: string;
    portRanges?: PortRange[];
    /**
     * A human readable name for the protocol (e.g., Transport Layer Security).
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this service protocol information elsewhere in this or other OSCAL
     * instances. The locally defined UUID of the service protocol can be used to reference the
     * data item locally or globally (e.g., in an imported OSCAL instance). This UUID should be
     * assigned per-subject, which means it should be consistently used to identify the same
     * subject across revisions of the document.
     */
    uuid?: string;
}

/**
 * Where applicable this is the IPv4 port range on which the service operates.
 */
export interface PortRange {
    /**
     * Indicates the ending port number in a port range
     */
    end?: number;
    /**
     * Indicates the starting port number in a port range
     */
    start?: number;
    /**
     * Indicates the transport type.
     */
    transport?: Transport;
}

/**
 * Indicates the transport type.
 */
export enum Transport {
    TCP = "TCP",
    UDP = "UDP",
}

/**
 * A reference to one or more roles with responsibility for performing a function relative
 * to the containing object.
 */
export interface ResponsibleRole {
    links?: Link[];
    partyUuids?: string[];
    props?: Property[];
    remarks?: string;
    /**
     * A human-oriented identifier reference to roles responsible for the business function.
     */
    roleID: string;
}

/**
 * Describes the operational status of the system component.
 */
export interface ComponentStatus {
    remarks?: string;
    /**
     * The operational status.
     */
    state: PurpleState;
}

/**
 * The operational status.
 */
export enum PurpleState {
    Disposition = "disposition",
    Operational = "operational",
    Other = "other",
    UnderDevelopment = "under-development",
}

/**
 * Identifies system elements being assessed, such as components, inventory items, and
 * locations. In the assessment plan, this identifies a planned assessment subject. In the
 * assessment results this is an actual assessment subject, and reflects any changes from
 * the plan. exactly what will be the focus of this assessment. Any subjects not identified
 * in this way are out-of-scope.
 */
export interface SubjectOfAssessment {
    /**
     * A human-readable description of the collection of subjects being included in this
     * assessment.
     */
    description?: string;
    excludeSubjects?: SelectAssessmentSubject[];
    includeAll?: IncludeAll;
    includeSubjects?: SelectAssessmentSubject[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
    /**
     * Indicates the type of assessment subject, such as a component, inventory, item, location,
     * or party represented by this selection statement.
     */
    type: string;
}

/**
 * Identifies a set of assessment subjects to include/exclude by UUID.
 */
export interface SelectAssessmentSubject {
    links?: Link[];
    props?: Property[];
    remarks?: string;
    /**
     * A machine-oriented identifier reference to a component, inventory-item, location, party,
     * user, or resource using it's UUID.
     */
    subjectUUID: string;
    /**
     * Used to indicate the type of object pointed to by the uuid-ref within a subject.
     */
    type: string;
}

/**
 * Include all controls from the imported catalog or profile resources.
 */
export interface IncludeAll {
}

/**
 * A collection of resources, which may be included directly or by reference.
 */
export interface BackMatter {
    resources?: Resource[];
}

/**
 * A resource associated with content in the containing document. A resource may be directly
 * included in the document base64 encoded or may point to one or more equivalent internet
 * resources.
 */
export interface Resource {
    /**
     * The Base64 alphabet in RFC 2045 - aligned with XSD.
     */
    base64?: Base64;
    /**
     * A citation consisting of end note text and optional structured bibliographic data.
     */
    citation?: Citation;
    /**
     * A short summary of the resource used to indicate the purpose of the resource.
     */
    description?: string;
    documentIDS?: DocumentIdentifier[];
    props?: Property[];
    remarks?: string;
    rlinks?: ResourceLink[];
    /**
     * A name given to the resource, which may be used by a tool for display and navigation.
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this defined resource elsewhere in this or other OSCAL instances. This UUID
     * should be assigned per-subject, which means it should be consistently used to identify
     * the same subject across revisions of the document.
     */
    uuid: string;
}

/**
 * The Base64 alphabet in RFC 2045 - aligned with XSD.
 */
export interface Base64 {
    /**
     * Name of the file before it was encoded as Base64 to be embedded in a resource. This is
     * the name that will be assigned to the file when the file is decoded.
     */
    filename?: string;
    /**
     * Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) Media
     * Types Registry.
     */
    mediaType?: string;
    value: string;
}

/**
 * A citation consisting of end note text and optional structured bibliographic data.
 */
export interface Citation {
    links?: Link[];
    props?: Property[];
    /**
     * A line of citation text.
     */
    text: string;
}

/**
 * A document identifier qualified by an identifier scheme. A document identifier provides a
 * globally unique identifier with a cross-instance scope that is used for a group of
 * documents that are to be treated as different versions of the same document. If this
 * element does not appear, or if the value of this element is empty, the value of
 * "document-id" is equal to the value of the "uuid" flag of the top-level root element.
 */
export interface DocumentIdentifier {
    identifier: string;
    /**
     * Qualifies the kind of document identifier using a URI. If the scheme is not provided the
     * value of the element will be interpreted as a string of characters.
     */
    scheme?: string;
}

/**
 * A pointer to an external resource with an optional hash for verification and change
 * detection.
 */
export interface ResourceLink {
    hashes?: Hash[];
    /**
     * A resolvable URI reference to a resource.
     */
    href: string;
    /**
     * Specifies a media type as defined by the Internet Assigned Numbers Authority (IANA) Media
     * Types Registry.
     */
    mediaType?: string;
}

/**
 * A representation of a cryptographic digest generated over a resource using a specified
 * hash algorithm.
 */
export interface Hash {
    /**
     * Method by which a hash is derived
     */
    algorithm: string;
    value: string;
}

/**
 * Used by the assessment plan and POA&M to import information about the system.
 */
export interface ImportSystemSecurityPlan {
    /**
     * A resolvable URL reference to the system security plan for the system being assessed.
     */
    href: string;
    remarks?: string;
}

/**
 * Used to define data objects that are used in the assessment plan, that do not appear in
 * the referenced SSP.
 */
export interface AssessmentPlanLocalDefinitions {
    activities?: Activity[];
    components?: AssessmentAssetsComponent[];
    inventoryItems?: InventoryItem[];
    objectivesAndMethods?: AssessmentSpecificControlObjective[];
    remarks?: string;
    users?: SystemUser[];
}

/**
 * Identifies an assessment or related process that can be performed. In the assessment
 * plan, this is an intended activity which may be associated with an assessment task. In
 * the assessment results, this an activity that was actually performed as part of an
 * assessment.
 */
export interface Activity {
    /**
     * A human-readable description of this included activity.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    relatedControls?: ReviewedControlsAndControlObjectives;
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    steps?: Step[];
    /**
     * The title for this included activity.
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this assessment activity elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the activity can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Identifies the controls being assessed and their control objectives.
 */
export interface ReviewedControlsAndControlObjectives {
    controlObjectiveSelections?: ReferencedControlObjectives[];
    controlSelections: AssessedControls[];
    /**
     * A human-readable description of control objectives.
     */
    description?: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
}

/**
 * Identifies the control objectives of the assessment. In the assessment plan, these are
 * the planned objectives. In the assessment results, these are the assessed objectives, and
 * reflects any changes from the plan.
 */
export interface ReferencedControlObjectives {
    /**
     * A human-readable description of this collection of control objectives.
     */
    description?: string;
    excludeObjectives?: SelectObjective[];
    includeAll?: IncludeAll;
    includeObjectives?: SelectObjective[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
}

/**
 * Used to select a control objective for inclusion/exclusion based on the control
 * objective's identifier.
 */
export interface SelectObjective {
    /**
     * Points to an assessment objective.
     */
    objectiveID: string;
}

/**
 * Identifies the controls being assessed. In the assessment plan, these are the planned
 * controls. In the assessment results, these are the actual controls, and reflects any
 * changes from the plan.
 */
export interface AssessedControls {
    /**
     * A human-readable description of in-scope controls specified for assessment.
     */
    description?: string;
    excludeControls?: SelectControl[];
    includeAll?: IncludeAll;
    includeControls?: SelectControl[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
}

/**
 * Used to select a control for inclusion/exclusion based on one or more control
 * identifiers. A set of statement identifiers can be used to target the inclusion/exclusion
 * to only specific control statements providing more granularity over the specific
 * statements that are within the asessment scope.
 */
export interface SelectControl {
    /**
     * A human-oriented identifier reference to a control with a corresponding id value. When
     * referencing an externally defined control, the Control Identifier Reference must be used
     * in the context of the external / imported OSCAL instance (e.g., uri-reference).
     */
    controlID: string;
    statementIDS?: string[];
}

/**
 * Identifies an individual step in a series of steps related to an activity, such as an
 * assessment test or examination procedure.
 */
export interface Step {
    /**
     * A human-readable description of this step.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    reviewedControls?: ReviewedControlsAndControlObjectives;
    /**
     * The title for this step.
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this step elsewhere in this or other OSCAL instances. The locally defined
     * UUID of the step (in a series of steps) can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * A single managed inventory item within the system.
 */
export interface InventoryItem {
    /**
     * A summary of the inventory item stating its purpose within the system.
     */
    description: string;
    implementedComponents?: ImplementedComponent[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleParties?: ResponsibleParty[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this inventory item elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the inventory item can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * The set of components that are implemented in a given system inventory item.
 */
export interface ImplementedComponent {
    /**
     * A machine-oriented identifier reference to a component that is implemented as part of an
     * inventory item.
     */
    componentUUID: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleParties?: ResponsibleParty[];
}

/**
 * A local definition of a control objective for this assessment. Uses catalog syntax for
 * control objective and assessment actions.
 */
export interface AssessmentSpecificControlObjective {
    /**
     * A human-oriented identifier reference to a control with a corresponding id value. When
     * referencing an externally defined control, the Control Identifier Reference must be used
     * in the context of the external / imported OSCAL instance (e.g., uri-reference).
     */
    controlID: string;
    /**
     * A human-readable description of this control objective.
     */
    description?: string;
    links?: Link[];
    parts: Part[];
    props?: Property[];
    remarks?: string;
}

/**
 * A partition of a control's definition or a child of another part.
 */
export interface Part {
    /**
     * A textual label that provides a sub-type or characterization of the part's name. This can
     * be used to further distinguish or discriminate between the semantics of multiple parts of
     * the same control with the same name and ns.
     */
    class?: string;
    /**
     * A human-oriented, locally unique identifier with cross-instance scope that can be used to
     * reference this defined part elsewhere in this or other OSCAL instances. When referenced
     * from another OSCAL instance, this identifier must be referenced in the context of the
     * containing resource (e.g., import-profile). This id should be assigned per-subject, which
     * means it should be consistently used to identify the same subject across revisions of the
     * document.
     */
    id?: string;
    links?: Link[];
    /**
     * A textual label that uniquely identifies the part's semantic type.
     */
    name: string;
    /**
     * A namespace qualifying the part's name. This allows different organizations to associate
     * distinct semantics with the same name.
     */
    ns?: string;
    parts?: Part[];
    props?: Property[];
    /**
     * Permits multiple paragraphs, lists, tables etc.
     */
    prose?: string;
    /**
     * A name given to the part, which may be used by a tool for display and navigation.
     */
    title?: string;
}

/**
 * A type of user that interacts with the system based on an associated role.
 */
export interface SystemUser {
    authorizedPrivileges?: Privilege[];
    /**
     * A summary of the user's purpose within the system.
     */
    description?: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    roleIDS?: string[];
    /**
     * A short common name, abbreviation, or acronym for the user.
     */
    shortName?: string;
    /**
     * A name given to the user, which may be used by a tool for display and navigation.
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this user class elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the system user can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Identifies a specific system privilege held by the user, along with an associated
 * description and/or rationale for the privilege.
 */
export interface Privilege {
    /**
     * A summary of the privilege's purpose within the system.
     */
    description?: string;
    functionsPerformed: string[];
    /**
     * A human readable name for the privilege.
     */
    title: string;
}

/**
 * Provides information about the publication and availability of the containing document.
 */
export interface PublicationMetadata {
    documentIDS?: DocumentIdentifier[];
    lastModified: Date;
    links?: Link[];
    locations?: Location[];
    oscalVersion: string;
    parties?: PartyOrganizationOrPerson[];
    props?: Property[];
    published?: Date;
    remarks?: string;
    responsibleParties?: ResponsibleParty[];
    revisions?: RevisionHistoryEntry[];
    roles?: Role[];
    /**
     * A name given to the document, which may be used by a tool for display and navigation.
     */
    title: string;
    version: string;
}

/**
 * A location, with associated metadata that can be referenced.
 */
export interface Location {
    address: Address;
    emailAddresses?: string[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
    telephoneNumbers?: TelephoneNumber[];
    /**
     * A name given to the location, which may be used by a tool for display and navigation.
     */
    title?: string;
    urls?: string[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this defined location elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the location can be used to reference the data item locally or
     * globally (e.g., from an importing OSCAL instance). This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid: string;
}

/**
 * A postal address for the location.
 */
export interface Address {
    addrLines?: string[];
    /**
     * City, town or geographical region for the mailing address.
     */
    city?: string;
    /**
     * The ISO 3166-1 alpha-2 country code for the mailing address.
     */
    country?: string;
    /**
     * Postal or ZIP code for mailing address
     */
    postalCode?: string;
    /**
     * State, province or analogous geographical region for mailing address
     */
    state?: string;
    /**
     * Indicates the type of address.
     */
    type?: string;
}

/**
 * Contact number by telephone.
 */
export interface TelephoneNumber {
    number: string;
    /**
     * Indicates the type of phone number.
     */
    type?: string;
}

/**
 * A responsible entity which is either a person or an organization.
 */
export interface PartyOrganizationOrPerson {
    addresses?: Address[];
    emailAddresses?: string[];
    externalIDS?: PartyExternalIdentifier[];
    links?: Link[];
    locationUuids?: string[];
    memberOfOrganizations?: string[];
    /**
     * The full name of the party. This is typically the legal name associated with the party.
     */
    name?: string;
    props?: Property[];
    remarks?: string;
    /**
     * A short common name, abbreviation, or acronym for the party.
     */
    shortName?: string;
    telephoneNumbers?: TelephoneNumber[];
    /**
     * A category describing the kind of party the object describes.
     */
    type: PartyType;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this defined party elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the party can be used to reference the data item locally or globally
     * (e.g., from an importing OSCAL instance). This UUID should be assigned per-subject, which
     * means it should be consistently used to identify the same subject across revisions of the
     * document.
     */
    uuid: string;
}

/**
 * An identifier for a person or organization using a designated scheme. e.g. an Open
 * Researcher and Contributor ID (ORCID)
 */
export interface PartyExternalIdentifier {
    id: string;
    /**
     * Indicates the type of external identifier.
     */
    scheme: string;
}

/**
 * A category describing the kind of party the object describes.
 */
export enum PartyType {
    Organization = "organization",
    Person = "person",
}

/**
 * An entry in a sequential list of revisions to the containing document in reverse
 * chronological order (i.e., most recent previous revision first).
 */
export interface RevisionHistoryEntry {
    lastModified?: Date;
    links?: Link[];
    oscalVersion?: string;
    props?: Property[];
    published?: Date;
    remarks?: string;
    /**
     * A name given to the document revision, which may be used by a tool for display and
     * navigation.
     */
    title?: string;
    version: string;
}

/**
 * Defines a function assumed or expected to be assumed by a party in a specific situation.
 */
export interface Role {
    /**
     * A summary of the role's purpose and associated responsibilities.
     */
    description?: string;
    /**
     * A human-oriented, locally unique identifier with cross-instance scope that can be used to
     * reference this defined role elsewhere in this or other OSCAL instances. When referenced
     * from another OSCAL instance, the locally defined ID of the Role from the imported OSCAL
     * instance must be referenced in the context of the containing resource (e.g., import,
     * import-component-definition, import-profile, import-ssp or import-ap). This ID should be
     * assigned per-subject, which means it should be consistently used to identify the same
     * subject across revisions of the document.
     */
    id: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    /**
     * A short common name, abbreviation, or acronym for the role.
     */
    shortName?: string;
    /**
     * A name given to the role, which may be used by a tool for display and navigation.
     */
    title: string;
}

/**
 * Represents a scheduled event or milestone, which may be associated with a series of
 * assessment actions.
 */
export interface Task {
    associatedActivities?: AssociatedActivity[];
    dependencies?: TaskDependency[];
    /**
     * A human-readable description of this task.
     */
    description?: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    subjects?: SubjectOfAssessment[];
    tasks?: Task[];
    /**
     * The timing under which the task is intended to occur.
     */
    timing?: EventTiming;
    /**
     * The title for this task.
     */
    title: string;
    /**
     * The type of task.
     */
    type: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this task elsewhere in this or other OSCAL instances. The locally defined
     * UUID of the task can be used to reference the data item locally or globally (e.g., in an
     * imported OSCAL instance). This UUID should be assigned per-subject, which means it should
     * be consistently used to identify the same subject across revisions of the document.
     */
    uuid: string;
}

/**
 * Identifies an individual activity to be performed as part of a task.
 */
export interface AssociatedActivity {
    /**
     * A machine-oriented identifier reference to an activity defined in the list of activities.
     */
    activityUUID: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    subjects: SubjectOfAssessment[];
}

/**
 * Used to indicate that a task is dependent on another task.
 */
export interface TaskDependency {
    remarks?: string;
    /**
     * A machine-oriented identifier reference to a unique task.
     */
    taskUUID: string;
}

/**
 * The timing under which the task is intended to occur.
 */
export interface EventTiming {
    /**
     * The task is intended to occur at the specified frequency.
     */
    atFrequency?: FrequencyCondition;
    /**
     * The task is intended to occur on the specified date.
     */
    onDate?: OnDateCondition;
    /**
     * The task is intended to occur within the specified date range.
     */
    withinDateRange?: OnDateRangeCondition;
}

/**
 * The task is intended to occur at the specified frequency.
 */
export interface FrequencyCondition {
    /**
     * The task must occur after the specified period has elapsed.
     */
    period: number;
    /**
     * The unit of time for the period.
     */
    unit: TimeUnit;
}

/**
 * The unit of time for the period.
 */
export enum TimeUnit {
    Days = "days",
    Hours = "hours",
    Minutes = "minutes",
    Months = "months",
    Seconds = "seconds",
    Years = "years",
}

/**
 * The task is intended to occur on the specified date.
 */
export interface OnDateCondition {
    /**
     * The task must occur on the specified date.
     */
    date: Date;
}

/**
 * The task is intended to occur within the specified date range.
 */
export interface OnDateRangeCondition {
    /**
     * The task must occur on or before the specified date.
     */
    end: Date;
    /**
     * The task must occur on or after the specified date.
     */
    start: Date;
}

/**
 * Used to define various terms and conditions under which an assessment, described by the
 * plan, can be performed. Each child part defines a different type of term or condition.
 */
export interface AssessmentPlanTermsAndConditions {
    parts?: AssessmentPart[];
}

/**
 * A partition of an assessment plan or results or a child of another part.
 */
export interface AssessmentPart {
    /**
     * A textual label that provides a sub-type or characterization of the part's name. This can
     * be used to further distinguish or discriminate between the semantics of multiple parts of
     * the same control with the same name and ns.
     */
    class?: string;
    links?: Link[];
    /**
     * A textual label that uniquely identifies the part's semantic type.
     */
    name: string;
    /**
     * A namespace qualifying the part's name. This allows different organizations to associate
     * distinct semantics with the same name.
     */
    ns?: string;
    parts?: AssessmentPart[];
    props?: Property[];
    /**
     * Permits multiple paragraphs, lists, tables etc.
     */
    prose?: string;
    /**
     * A name given to the part, which may be used by a tool for display and navigation.
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this part elsewhere in this or other OSCAL instances. The locally defined
     * UUID of the part can be used to reference the data item locally or globally (e.g., in an
     * ported OSCAL instance). This UUID should be assigned per-subject, which means it should
     * be consistently used to identify the same subject across revisions of the document.
     */
    uuid?: string;
}

/**
 * Security assessment results, such as those provided by a FedRAMP assessor in the FedRAMP
 * Security Assessment Report.
 */
export interface SecurityAssessmentResultsSAR {
    backMatter?: BackMatter;
    importAp: ImportAssessmentPlan;
    /**
     * Used to define data objects that are used in the assessment plan, that do not appear in
     * the referenced SSP.
     */
    localDefinitions?: AssessmentResultsLocalDefinitions;
    metadata: PublicationMetadata;
    results: AssessmentResult[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this assessment results instance in this or other OSCAL instances. The
     * locally defined UUID of the assessment result can be used to reference the data item
     * locally or globally (e.g., in an imported OSCAL instance). This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid: string;
}

/**
 * Used by assessment-results to import information about the original plan for assessing
 * the system.
 */
export interface ImportAssessmentPlan {
    /**
     * A resolvable URL reference to the assessment plan governing the assessment activities.
     */
    href: string;
    remarks?: string;
}

/**
 * Used to define data objects that are used in the assessment plan, that do not appear in
 * the referenced SSP.
 */
export interface AssessmentResultsLocalDefinitions {
    activities?: Activity[];
    objectivesAndMethods?: AssessmentSpecificControlObjective[];
    remarks?: string;
}

/**
 * Used by the assessment results and POA&M. In the assessment results, this identifies all
 * of the assessment observations and findings, initial and residual risks, deviations, and
 * disposition. In the POA&M, this identifies initial and residual risks, deviations, and
 * disposition.
 */
export interface AssessmentResult {
    /**
     * A log of all assessment-related actions taken.
     */
    assessmentLog?: AssessmentLog;
    attestations?: AttestationStatements[];
    /**
     * A human-readable description of this set of test results.
     */
    description: string;
    /**
     * Date/time stamp identifying the end of the evidence collection reflected in these
     * results. In a continuous motoring scenario, this may contain the same value as start if
     * appropriate.
     */
    end?: Date;
    findings?: Finding[];
    links?: Link[];
    /**
     * Used to define data objects that are used in the assessment plan, that do not appear in
     * the referenced SSP.
     */
    localDefinitions?: ResultLocalDefinitions;
    observations?: Observation[];
    props?: Property[];
    remarks?: string;
    reviewedControls: ReviewedControlsAndControlObjectives;
    risks?: IdentifiedRisk[];
    /**
     * Date/time stamp identifying the start of the evidence collection reflected in these
     * results.
     */
    start: Date;
    /**
     * The title for this set of results.
     */
    title: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this set of results in this or other OSCAL instances. The locally defined
     * UUID of the assessment result can be used to reference the data item locally or globally
     * (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject, which
     * means it should be consistently used to identify the same subject across revisions of the
     * document.
     */
    uuid: string;
}

/**
 * A log of all assessment-related actions taken.
 */
export interface AssessmentLog {
    entries: AssessmentLogEntry[];
}

/**
 * Identifies the result of an action and/or task that occurred as part of executing an
 * assessment plan or an assessment event that occurred in producing the assessment results.
 */
export interface AssessmentLogEntry {
    /**
     * A human-readable description of this event.
     */
    description?: string;
    /**
     * Identifies the end date and time of an event. If the event is a point in time, the start
     * and end will be the same date and time.
     */
    end?: Date;
    links?: Link[];
    loggedBy?: LoggedBy[];
    props?: Property[];
    relatedTasks?: TaskReference[];
    remarks?: string;
    /**
     * Identifies the start date and time of an event.
     */
    start: Date;
    /**
     * The title for this event.
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference an assessment event in this or other OSCAL instances. The locally defined
     * UUID of the assessment log entry can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Used to indicate who created a log entry in what role.
 */
export interface LoggedBy {
    /**
     * A machine-oriented identifier reference to the party who is making the log entry.
     */
    partyUUID: string;
    /**
     * A point to the role-id of the role in which the party is making the log entry.
     */
    roleID?: string;
}

/**
 * Identifies an individual task for which the containing object is a consequence of.
 */
export interface TaskReference {
    /**
     * Used to detail assessment subjects that were identfied by this task.
     */
    identifiedSubject?: IdentifiedSubject;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleParties?: ResponsibleParty[];
    subjects?: SubjectOfAssessment[];
    /**
     * A machine-oriented identifier reference to a unique task.
     */
    taskUUID: string;
}

/**
 * Used to detail assessment subjects that were identfied by this task.
 */
export interface IdentifiedSubject {
    /**
     * A machine-oriented identifier reference to a unique assessment subject placeholder
     * defined by this task.
     */
    subjectPlaceholderUUID: string;
    subjects: SubjectOfAssessment[];
}

/**
 * A set of textual statements, typically written by the assessor.
 */
export interface AttestationStatements {
    parts: AssessmentPart[];
    responsibleParties?: ResponsibleParty[];
}

/**
 * Describes an individual finding.
 */
export interface Finding {
    /**
     * A human-readable description of this finding.
     */
    description: string;
    /**
     * A machine-oriented identifier reference to the implementation statement in the SSP to
     * which this finding is related.
     */
    implementationStatementUUID?: string;
    links?: Link[];
    origins?: FindingOrigin[];
    props?: Property[];
    relatedObservations?: FindingRelatedObservation[];
    relatedRisks?: FindingRelatedRisk[];
    remarks?: string;
    target: TargetClass;
    /**
     * The title for this finding.
     */
    title: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this finding in this or other OSCAL instances. The locally defined UUID of
     * the finding can be used to reference the data item locally or globally (e.g., in an
     * imported OSCAL instance). This UUID should be assigned per-subject, which means it should
     * be consistently used to identify the same subject across revisions of the document.
     */
    uuid: string;
}

/**
 * Identifies the source of the finding, such as a tool, interviewed person, or activity.
 */
export interface FindingOrigin {
    actors: OriginatingActor[];
    relatedTasks?: TaskReference[];
}

/**
 * The actor that produces an observation, a finding, or a risk. One or more actor type can
 * be used to specify a person that is using a tool.
 */
export interface OriginatingActor {
    /**
     * A machine-oriented identifier reference to the tool or person based on the associated
     * type.
     */
    actorUUID: string;
    links?: Link[];
    props?: Property[];
    /**
     * For a party, this can optionally be used to specify the role the actor was performing.
     */
    roleID?: string;
    /**
     * The kind of actor.
     */
    type: ActorType;
}

/**
 * The kind of actor.
 */
export enum ActorType {
    AssessmentPlatform = "assessment-platform",
    Party = "party",
    Tool = "tool",
}

/**
 * Relates the finding to a set of referenced observations that were used to determine the
 * finding.
 */
export interface FindingRelatedObservation {
    /**
     * A machine-oriented identifier reference to an observation defined in the list of
     * observations.
     */
    observationUUID: string;
}

/**
 * Relates the finding to a set of referenced risks that were used to determine the finding.
 */
export interface FindingRelatedRisk {
    /**
     * A machine-oriented identifier reference to a risk defined in the list of risks.
     */
    riskUUID: string;
}

/**
 * Captures an assessor's conclusions regarding the degree to which an objective is
 * satisfied.
 */
export interface TargetClass {
    /**
     * A human-readable description of the assessor's conclusions regarding the degree to which
     * an objective is satisfied.
     */
    description?: string;
    implementationStatus?: ImplementationStatus;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    /**
     * A determination of if the objective is satisfied or not within a given system.
     */
    status: StatusClass;
    /**
     * A machine-oriented identifier reference for a specific target qualified by the type.
     */
    targetID: string;
    /**
     * The title for this objective status.
     */
    title?: string;
    /**
     * Identifies the type of the target.
     */
    type: FindingTargetType;
}

/**
 * Indicates the degree to which the a given control is implemented.
 */
export interface ImplementationStatus {
    remarks?: string;
    /**
     * Identifies the implementation status of the control or control objective.
     */
    state: string;
}

/**
 * A determination of if the objective is satisfied or not within a given system.
 */
export interface StatusClass {
    /**
     * The reason the objective was given it's status.
     */
    reason?: string;
    remarks?: string;
    /**
     * An indication as to whether the objective is satisfied or not.
     */
    state: ObjectiveStatusState;
}

/**
 * An indication as to whether the objective is satisfied or not.
 */
export enum ObjectiveStatusState {
    NotSatisfied = "not-satisfied",
    Satisfied = "satisfied",
}

/**
 * Identifies the type of the target.
 */
export enum FindingTargetType {
    ObjectiveID = "objective-id",
    StatementID = "statement-id",
}

/**
 * Used to define data objects that are used in the assessment plan, that do not appear in
 * the referenced SSP.
 */
export interface ResultLocalDefinitions {
    assessmentAssets?: AssessmentAssets;
    components?: AssessmentAssetsComponent[];
    inventoryItems?: InventoryItem[];
    tasks?: Task[];
    users?: SystemUser[];
}

/**
 * Describes an individual observation.
 */
export interface Observation {
    /**
     * Date/time stamp identifying when the finding information was collected.
     */
    collected: Date;
    /**
     * A human-readable description of this assessment observation.
     */
    description: string;
    /**
     * Date/time identifying when the finding information is out-of-date and no longer valid.
     * Typically used with continuous assessment scenarios.
     */
    expires?: Date;
    links?: Link[];
    methods: string[];
    origins?: FindingOrigin[];
    props?: Property[];
    relevantEvidence?: RelevantEvidence[];
    remarks?: string;
    subjects?: IdentifiesTheSubject[];
    /**
     * The title for this observation.
     */
    title?: string;
    types?: string[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this observation elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the observation can be used to reference the data item locally or
     * globally (e.g., in an imorted OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Links this observation to relevant evidence.
 */
export interface RelevantEvidence {
    /**
     * A human-readable description of this evidence.
     */
    description: string;
    /**
     * A resolvable URL reference to relevant evidence.
     */
    href?: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
}

/**
 * A human-oriented identifier reference to a resource. Use type to indicate whether the
 * identified resource is a component, inventory item, location, user, or something else.
 */
export interface IdentifiesTheSubject {
    links?: Link[];
    props?: Property[];
    remarks?: string;
    /**
     * A machine-oriented identifier reference to a component, inventory-item, location, party,
     * user, or resource using it's UUID.
     */
    subjectUUID: string;
    /**
     * The title or name for the referenced subject.
     */
    title?: string;
    /**
     * Used to indicate the type of object pointed to by the uuid-ref within a subject.
     */
    type: string;
}

/**
 * An identified risk.
 */
export interface IdentifiedRisk {
    characterizations?: Characterization[];
    /**
     * The date/time by which the risk must be resolved.
     */
    deadline?: Date;
    /**
     * A human-readable summary of the identified risk, to include a statement of how the risk
     * impacts the system.
     */
    description: string;
    links?: Link[];
    mitigatingFactors?: MitigatingFactor[];
    origins?: FindingOrigin[];
    props?: Property[];
    relatedObservations?: RiskRelatedObservation[];
    remediations?: RiskResponse[];
    /**
     * A log of all risk-related tasks taken.
     */
    riskLog?: RiskLog;
    /**
     * An summary of impact for how the risk affects the system.
     */
    statement: string;
    status: string;
    threatIDS?: ThreatID[];
    /**
     * The title for this risk.
     */
    title: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this risk elsewhere in this or other OSCAL instances. The locally defined
     * UUID of the risk can be used to reference the data item locally or globally (e.g., in an
     * imported OSCAL instance). This UUID should be assigned per-subject, which means it should
     * be consistently used to identify the same subject across revisions of the document.
     */
    uuid: string;
}

/**
 * A collection of descriptive data about the containing object from a specific origin.
 */
export interface Characterization {
    facets: Facet[];
    links?: Link[];
    origin: FindingOrigin;
    props?: Property[];
}

/**
 * An individual characteristic that is part of a larger set produced by the same actor.
 */
export interface Facet {
    links?: Link[];
    /**
     * The name of the risk metric within the specified system.
     */
    name: string;
    props?: Property[];
    remarks?: string;
    /**
     * Specifies the naming system under which this risk metric is organized, which allows for
     * the same names to be used in different systems controlled by different parties. This
     * avoids the potential of a name clash.
     */
    system: string;
    /**
     * Indicates the value of the facet.
     */
    value: string;
}

/**
 * Describes an existing mitigating factor that may affect the overall determination of the
 * risk, with an optional link to an implementation statement in the SSP.
 */
export interface MitigatingFactor {
    /**
     * A human-readable description of this mitigating factor.
     */
    description: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this implementation statement elsewhere in this or other OSCAL instancess.
     * The locally defined UUID of the implementation statement can be used to reference the
     * data item locally or globally (e.g., in an imported OSCAL instance). This UUID should be
     * assigned per-subject, which means it should be consistently used to identify the same
     * subject across revisions of the document.
     */
    implementationUUID?: string;
    links?: Link[];
    props?: Property[];
    subjects?: IdentifiesTheSubject[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this mitigating factor elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the mitigating factor can be used to reference the data item
     * locally or globally (e.g., in an imported OSCAL instance). This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid: string;
}

/**
 * Relates the finding to a set of referenced observations that were used to determine the
 * finding.
 */
export interface RiskRelatedObservation {
    /**
     * A machine-oriented identifier reference to an observation defined in the list of
     * observations.
     */
    observationUUID: string;
}

/**
 * Describes either recommended or an actual plan for addressing the risk.
 */
export interface RiskResponse {
    /**
     * A human-readable description of this response plan.
     */
    description: string;
    /**
     * Identifies whether this is a recommendation, such as from an assessor or tool, or an
     * actual plan accepted by the system owner.
     */
    lifecycle: string;
    links?: Link[];
    origins?: FindingOrigin[];
    props?: Property[];
    remarks?: string;
    requiredAssets?: RequiredAsset[];
    tasks?: Task[];
    /**
     * The title for this response activity.
     */
    title: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this remediation elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the risk response can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Identifies an asset required to achieve remediation.
 */
export interface RequiredAsset {
    /**
     * A human-readable description of this required asset.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    subjects?: IdentifiesTheSubject[];
    /**
     * The title for this required asset.
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this required asset elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the asset can be used to reference the data item locally or globally
     * (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject, which
     * means it should be consistently used to identify the same subject across revisions of the
     * document.
     */
    uuid: string;
}

/**
 * A log of all risk-related tasks taken.
 */
export interface RiskLog {
    entries: RiskLogEntry[];
}

/**
 * Identifies an individual risk response that occurred as part of managing an identified
 * risk.
 */
export interface RiskLogEntry {
    /**
     * A human-readable description of what was done regarding the risk.
     */
    description?: string;
    /**
     * Identifies the end date and time of the event. If the event is a point in time, the start
     * and end will be the same date and time.
     */
    end?: Date;
    links?: Link[];
    loggedBy?: LoggedBy[];
    props?: Property[];
    relatedResponses?: RiskResponseReference[];
    remarks?: string;
    /**
     * Identifies the start date and time of the event.
     */
    start: Date;
    statusChange?: string;
    /**
     * The title for this risk log entry.
     */
    title?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this risk log entry elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the risk log entry can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Identifies an individual risk response that this log entry is for.
 */
export interface RiskResponseReference {
    links?: Link[];
    props?: Property[];
    relatedTasks?: TaskReference[];
    remarks?: string;
    /**
     * A machine-oriented identifier reference to a unique risk response.
     */
    responseUUID: string;
}

/**
 * A pointer, by ID, to an externally-defined threat.
 */
export interface ThreatID {
    /**
     * An optional location for the threat data, from which this ID originates.
     */
    href?: string;
    id: string;
    /**
     * Specifies the source of the threat information.
     */
    system: string;
}

/**
 * A collection of controls.
 */
export interface Catalog {
    backMatter?: BackMatter;
    controls?: Control[];
    groups?: ControlGroup[];
    metadata: PublicationMetadata;
    params?: Parameter[];
    /**
     * A globally unique identifier with cross-instance scope for this catalog instance. This
     * UUID should be changed when this document is revised.
     */
    uuid: string;
}

/**
 * A structured information object representing a security or privacy control. Each security
 * or privacy control within the Catalog is defined by a distinct control instance.
 */
export interface Control {
    /**
     * A textual label that provides a sub-type or characterization of the control.
     */
    class?: string;
    controls?: Control[];
    /**
     * A human-oriented, locally unique identifier with instance scope that can be used to
     * reference this control elsewhere in this and other OSCAL instances (e.g., profiles). This
     * id should be assigned per-subject, which means it should be consistently used to identify
     * the same control across revisions of the document.
     */
    id: string;
    links?: Link[];
    params?: Parameter[];
    parts?: Part[];
    props?: Property[];
    /**
     * A name given to the control, which may be used by a tool for display and navigation.
     */
    title: string;
}

/**
 * Parameters provide a mechanism for the dynamic assignment of value(s) in a control.
 */
export interface Parameter {
    /**
     * A textual label that provides a characterization of the parameter.
     */
    class?: string;
    constraints?: Constraint[];
    /**
     * **(deprecated)** Another parameter invoking this one. This construct has been deprecated
     * and should not be used.
     */
    dependsOn?: string;
    guidelines?: Guideline[];
    /**
     * A human-oriented, locally unique identifier with cross-instance scope that can be used to
     * reference this defined parameter elsewhere in this or other OSCAL instances. When
     * referenced from another OSCAL instance, this identifier must be referenced in the context
     * of the containing resource (e.g., import-profile). This id should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    id: string;
    /**
     * A short, placeholder name for the parameter, which can be used as a substitute for a
     * value if no value is assigned.
     */
    label?: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    select?: Selection;
    /**
     * Describes the purpose and use of a parameter
     */
    usage?: string;
    values?: string[];
}

/**
 * A formal or informal expression of a constraint or test
 */
export interface Constraint {
    /**
     * A textual summary of the constraint to be applied.
     */
    description?: string;
    tests?: ConstraintTest[];
}

/**
 * A test expression which is expected to be evaluated by a tool.
 */
export interface ConstraintTest {
    /**
     * A formal (executable) expression of a constraint
     */
    expression: string;
    remarks?: string;
}

/**
 * A prose statement that provides a recommendation for the use of a parameter.
 */
export interface Guideline {
    /**
     * Prose permits multiple paragraphs, lists, tables etc.
     */
    prose: string;
}

/**
 * Presenting a choice among alternatives
 */
export interface Selection {
    choice?: string[];
    /**
     * Describes the number of selections that must occur. Without this setting, only one value
     * should be assumed to be permitted.
     */
    howMany?: ParameterCardinality;
}

/**
 * Describes the number of selections that must occur. Without this setting, only one value
 * should be assumed to be permitted.
 */
export enum ParameterCardinality {
    One = "one",
    OneOrMore = "one-or-more",
}

/**
 * A group of controls, or of groups of controls.
 */
export interface ControlGroup {
    /**
     * A textual label that provides a sub-type or characterization of the group.
     */
    class?: string;
    controls?: Control[];
    groups?: ControlGroup[];
    /**
     * A human-oriented, locally unique identifier with cross-instance scope that can be used to
     * reference this defined group elsewhere in in this and other OSCAL instances (e.g.,
     * profiles). This id should be assigned per-subject, which means it should be consistently
     * used to identify the same group across revisions of the document.
     */
    id?: string;
    links?: Link[];
    params?: Parameter[];
    parts?: Part[];
    props?: Property[];
    /**
     * A name given to the group, which may be used by a tool for display and navigation.
     */
    title: string;
}

/**
 * A collection of component descriptions, which may optionally be grouped by capability.
 */
export interface ComponentDefinition {
    backMatter?: BackMatter;
    capabilities?: Capability[];
    components?: ComponentDefinitionComponent[];
    importComponentDefinitions?: ImportComponentDefinition[];
    metadata: PublicationMetadata;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this component definition elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the component definition can be used to reference the data item
     * locally or globally (e.g., in an imported OSCAL instance). This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid: string;
}

/**
 * A grouping of other components and/or capabilities.
 */
export interface Capability {
    controlImplementations?: ControlImplementationSet[];
    /**
     * A summary of the capability.
     */
    description: string;
    incorporatesComponents?: IncorporatesComponent[];
    links?: Link[];
    /**
     * The capability's human-readable name.
     */
    name: string;
    props?: Property[];
    remarks?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this capability elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the capability can be used to reference the data item locally or globally
     * (e.g., in an imported OSCAL instance).This UUID should be assigned per-subject, which
     * means it should be consistently used to identify the same subject across revisions of the
     * document.
     */
    uuid: string;
}

/**
 * Defines how the component or capability supports a set of controls.
 */
export interface ControlImplementationSet {
    /**
     * A description of how the specified set of controls are implemented for the containing
     * component or capability.
     */
    description: string;
    implementedRequirements: ImplementedRequirementElement[];
    links?: Link[];
    props?: Property[];
    setParameters?: SetParameterValue[];
    /**
     * A reference to an OSCAL catalog or profile providing the referenced control or subcontrol
     * definition.
     */
    source: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference a set of implemented controls elsewhere in this or other OSCAL instances.
     * The locally defined UUID of the control implementation set can be used to reference the
     * data item locally or globally (e.g., in an imported OSCAL instance). This UUID should be
     * assigned per-subject, which means it should be consistently used to identify the same
     * subject across revisions of the document.
     */
    uuid: string;
}

/**
 * Describes how the containing component or capability implements an individual control.
 */
export interface ImplementedRequirementElement {
    /**
     * A human-oriented identifier reference to a control with a corresponding id value. When
     * referencing an externally defined control, the Control Identifier Reference must be used
     * in the context of the external / imported OSCAL instance (e.g., uri-reference).
     */
    controlID: string;
    /**
     * A suggestion for how the specified control may be implemented if the containing component
     * or capability is instantiated in a system security plan.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    setParameters?: SetParameterValue[];
    statements?: ControlStatementImplementation[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference a specific control implementation elsewhere in this or other OSCAL
     * instances. The locally defined UUID of the control implementation can be used to
     * reference the data item locally or globally (e.g., in an imported OSCAL instance).This
     * UUID should be assigned per-subject, which means it should be consistently used to
     * identify the same subject across revisions of the document.
     */
    uuid: string;
}

/**
 * Identifies the parameter that will be set by the enclosed value.
 */
export interface SetParameterValue {
    /**
     * A human-oriented reference to a parameter within a control, who's catalog has been
     * imported into the current implementation context.
     */
    paramID: string;
    remarks?: string;
    values: string[];
}

/**
 * Identifies which statements within a control are addressed.
 */
export interface ControlStatementImplementation {
    /**
     * A summary of how the containing control statement is implemented by the component or
     * capability.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    /**
     * A human-oriented identifier reference to a control statement.
     */
    statementID: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this control statement elsewhere in this or other OSCAL instances. The UUID
     * of the control statement in the source OSCAL instance is sufficient to reference the data
     * item locally or globally (e.g., in an imported OSCAL instance).
     */
    uuid: string;
}

/**
 * TBD
 */
export interface IncorporatesComponent {
    /**
     * A machine-oriented identifier reference to a component.
     */
    componentUUID: string;
    /**
     * A description of the component, including information about its function.
     */
    description: string;
}

/**
 * A defined component that can be part of an implemented system.
 */
export interface ComponentDefinitionComponent {
    controlImplementations?: ControlImplementationSet[];
    /**
     * A description of the component, including information about its function.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    protocols?: ServiceProtocolInformation[];
    /**
     * A summary of the technological or business purpose of the component.
     */
    purpose?: string;
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    /**
     * A human readable name for the component.
     */
    title: string;
    /**
     * A category describing the purpose of the component.
     */
    type: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this component elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the component can be used to reference the data item locally or globally
     * (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject, which
     * means it should be consistently used to identify the same subject across revisions of the
     * document.
     */
    uuid: string;
}

/**
 * Loads a component definition from another resource.
 */
export interface ImportComponentDefinition {
    /**
     * A link to a resource that defines a set of components and/or capabilities to import into
     * this collection.
     */
    href: string;
}

/**
 * A plan of action and milestones which identifies initial and residual risks, deviations,
 * and disposition, such as those required by FedRAMP.
 */
export interface PlanOfActionAndMilestonesPOAM {
    backMatter?: BackMatter;
    importSSP?: ImportSystemSecurityPlan;
    localDefinitions?: PlanOfActionAndMilestonesLocalDefinitions;
    metadata: PublicationMetadata;
    observations?: Observation[];
    poamItems: POAMItem[];
    risks?: IdentifiedRisk[];
    systemID?: SystemIdentification;
    /**
     * A machine-oriented, globally unique identifier with instancescope that can be used to
     * reference this POA&M instance in this OSCAL instance. This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid: string;
}

/**
 * Allows components, and inventory-items to be defined within the POA&M for circumstances
 * where no OSCAL-based SSP exists, or is not delivered with the POA&M.
 */
export interface PlanOfActionAndMilestonesLocalDefinitions {
    components?: AssessmentAssetsComponent[];
    inventoryItems?: InventoryItem[];
    remarks?: string;
}

/**
 * Describes an individual POA&M item.
 */
export interface POAMItem {
    /**
     * A human-readable description of POA&M item.
     */
    description: string;
    links?: Link[];
    origins?: PoamItemOrigin[];
    props?: Property[];
    relatedObservations?: PoamItemRelatedObservation[];
    relatedRisks?: PoamItemRelatedRisk[];
    remarks?: string;
    /**
     * The title or name for this POA&M item .
     */
    title: string;
    /**
     * A machine-oriented, globally unique identifier with instance scope that can be used to
     * reference this POA&M item entry in this OSCAL instance. This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid?: string;
}

/**
 * Identifies the source of the finding, such as a tool or person.
 */
export interface PoamItemOrigin {
    actors: OriginatingActor[];
}

/**
 * Relates the poam-item to a set of referenced observations that were used to determine the
 * finding.
 */
export interface PoamItemRelatedObservation {
    /**
     * A machine-oriented identifier reference to an observation defined in the list of
     * observations.
     */
    observationUUID: string;
}

/**
 * Relates the finding to a set of referenced risks that were used to determine the finding.
 */
export interface PoamItemRelatedRisk {
    /**
     * A machine-oriented identifier reference to a risk defined in the list of risks.
     */
    riskUUID: string;
}

/**
 * A human-oriented, globally unique identifier with cross-instance scope that can be used
 * to reference this system identification property elsewhere in this or other OSCAL
 * instances. When referencing an externally defined system identification, the system
 * identification must be used in the context of the external / imported OSCAL instance
 * (e.g., uri-reference). This string should be assigned per-subject, which means it should
 * be consistently used to identify the same system across revisions of the document.
 */
export interface SystemIdentification {
    id: string;
    /**
     * Identifies the identification system from which the provided identifier was assigned.
     */
    identifierType?: string;
}

/**
 * Each OSCAL profile is defined by a Profile element
 */
export interface Profile {
    backMatter?: BackMatter;
    imports: ImportResource[];
    merge?: MergeControls;
    metadata: PublicationMetadata;
    modify?: ModifyControls;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this profile elsewhere in this or other OSCAL instances. The locally defined
     * UUID of the profile can be used to reference the data item locally or globally (e.g., in
     * an imported OSCAL instance).This identifier should be assigned per-subject, which means
     * it should be consistently used to identify the same profile across revisions of the
     * document.
     */
    uuid: string;
}

/**
 * The import designates a catalog or profile to be included (referenced and potentially
 * modified) by this profile. The import also identifies which controls to select using the
 * include-all, include-controls, and exclude-controls directives.
 */
export interface ImportResource {
    excludeControls?: Call[];
    /**
     * A resolvable URL reference to the base catalog or profile that this profile is tailoring.
     */
    href: string;
    includeAll?: IncludeAll;
    includeControls?: Call[];
}

/**
 * Call a control by its ID
 */
export interface Call {
    matching?: MatchControlsByPattern[];
    /**
     * When a control is included, whether its child (dependent) controls are also included.
     */
    withChildControls?: IncludeContainedControlsWithControl;
    withIDS?: string[];
}

/**
 * Select controls by (regular expression) match on ID
 */
export interface MatchControlsByPattern {
    /**
     * A glob expression matching the IDs of one or more controls to be selected.
     */
    pattern?: string;
}

/**
 * When a control is included, whether its child (dependent) controls are also included.
 */
export enum IncludeContainedControlsWithControl {
    No = "no",
    Yes = "yes",
}

/**
 * A Merge element provides structuring directives that drive how controls are organized
 * after resolution.
 */
export interface MergeControls {
    /**
     * An As-is element indicates that the controls should be structured in resolution as they
     * are structured in their source catalogs. It does not contain any elements or attributes.
     */
    asIs?: boolean;
    /**
     * A Combine element defines how to combine multiple (competing) versions of the same
     * control.
     */
    combine?: CombinationRule;
    /**
     * A Custom element frames a structure for embedding represented controls in resolution.
     */
    custom?: CustomGrouping;
    /**
     * Use the flat structuring method.
     */
    flat?: Flat;
}

/**
 * A Combine element defines how to combine multiple (competing) versions of the same
 * control.
 */
export interface CombinationRule {
    /**
     * How clashing controls should be handled
     */
    method?: CombinationMethod;
}

/**
 * How clashing controls should be handled
 */
export enum CombinationMethod {
    Keep = "keep",
    Merge = "merge",
    UseFirst = "use-first",
}

/**
 * A Custom element frames a structure for embedding represented controls in resolution.
 */
export interface CustomGrouping {
    groups?: CustomGroup[];
    insertControls?: SelectControls[];
}

/**
 * A group of (selected) controls or of groups of controls
 */
export interface CustomGroup {
    /**
     * A textual label that provides a sub-type or characterization of the group.
     */
    class?: string;
    groups?: CustomGroup[];
    /**
     * A human-oriented, locally unique identifier with cross-instance scope that can be used to
     * reference this defined group elsewhere in this or other OSCAL instances. When referenced
     * from another OSCAL instance, this identifier must be referenced in the context of the
     * containing resource (e.g., import-profile). This id should be assigned per-subject, which
     * means it should be consistently used to identify the same group across revisions of the
     * document.
     */
    id?: string;
    insertControls?: SelectControls[];
    links?: Link[];
    params?: Parameter[];
    parts?: Part[];
    props?: Property[];
    /**
     * A name given to the group, which may be used by a tool for display and navigation.
     */
    title: string;
}

/**
 * Specifies which controls to use in the containing context.
 */
export interface SelectControls {
    excludeControls?: Call[];
    includeAll?: IncludeAll;
    includeControls?: Call[];
    /**
     * A designation of how a selection of controls in a profile is to be ordered.
     */
    order?: Order;
}

/**
 * A designation of how a selection of controls in a profile is to be ordered.
 */
export enum Order {
    Ascending = "ascending",
    Descending = "descending",
    Keep = "keep",
}

/**
 * Use the flat structuring method.
 */
export interface Flat {
}

/**
 * Set parameters or amend controls in resolution
 */
export interface ModifyControls {
    alters?: Alteration[];
    setParameters?: ParameterSetting[];
}

/**
 * An Alter element specifies changes to be made to an included control when a profile is
 * resolved.
 */
export interface Alteration {
    adds?: Addition[];
    /**
     * A human-oriented identifier reference to a control with a corresponding id value. When
     * referencing an externally defined control, the Control Identifier Reference must be used
     * in the context of the external / imported OSCAL instance (e.g., uri-reference).
     */
    controlID: string;
    removes?: Removal[];
}

/**
 * Specifies contents to be added into controls, in resolution
 */
export interface Addition {
    /**
     * Target location of the addition.
     */
    byID?: string;
    links?: Link[];
    params?: Parameter[];
    parts?: Part[];
    /**
     * Where to add the new content with respect to the targeted element (beside it or inside it)
     */
    position?: Position;
    props?: Property[];
    /**
     * A name given to the control, which may be used by a tool for display and navigation.
     */
    title?: string;
}

/**
 * Where to add the new content with respect to the targeted element (beside it or inside it)
 */
export enum Position {
    After = "after",
    Before = "before",
    Ending = "ending",
    Starting = "starting",
}

/**
 * Specifies objects to be removed from a control based on specific aspects of the object
 * that must all match.
 */
export interface Removal {
    /**
     * Identify items to remove by matching their class.
     */
    byClass?: string;
    /**
     * Identify items to remove indicated by their id.
     */
    byID?: string;
    /**
     * Identify items to remove by the name of the item's information element name, e.g. title
     * or prop
     */
    byItemName?: string;
    /**
     * Identify items to remove by matching their assigned name
     */
    byName?: string;
    /**
     * Identify items to remove by the item's ns, which is the namespace associated with a part,
     * or prop.
     */
    byNS?: string;
}

/**
 * A parameter setting, to be propagated to points of insertion
 */
export interface ParameterSetting {
    /**
     * A textual label that provides a characterization of the parameter.
     */
    class?: string;
    constraints?: Constraint[];
    /**
     * **(deprecated)** Another parameter invoking this one. This construct has been deprecated
     * and should not be used.
     */
    dependsOn?: string;
    guidelines?: Guideline[];
    /**
     * A short, placeholder name for the parameter, which can be used as a substitute for a
     * value if no value is assigned.
     */
    label?: string;
    links?: Link[];
    /**
     * A human-oriented, locally unique identifier with cross-instance scope that can be used to
     * reference this defined parameter elsewhere in this or other OSCAL instances. When
     * referenced from another OSCAL instance, this identifier must be referenced in the context
     * of the containing resource (e.g., import-profile). This id should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    paramID: string;
    props?: Property[];
    select?: Selection;
    /**
     * Describes the purpose and use of a parameter
     */
    usage?: string;
    values?: string[];
}

/**
 * A system security plan, such as those described in NIST SP 800-18
 */
export interface SystemSecurityPlanSSP {
    backMatter?: BackMatter;
    controlImplementation: ControlImplementationClass;
    importProfile: ImportProfile;
    metadata: PublicationMetadata;
    systemCharacteristics: SystemCharacteristics;
    systemImplementation: SystemImplementation;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this system security plan (SSP) elsewhere in this or other OSCAL instances.
     * The locally defined UUID of the SSP can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance).This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Describes how the system satisfies a set of controls.
 */
export interface ControlImplementationClass {
    /**
     * A statement describing important things to know about how this set of control
     * satisfaction documentation is approached.
     */
    description: string;
    implementedRequirements: ControlBasedRequirement[];
    setParameters?: SetParameterValue[];
}

/**
 * Describes how the system satisfies the requirements of an individual control.
 */
export interface ControlBasedRequirement {
    byComponents?: ComponentControlImplementation[];
    /**
     * A human-oriented identifier reference to a control with a corresponding id value. When
     * referencing an externally defined control, the Control Identifier Reference must be used
     * in the context of the external / imported OSCAL instance (e.g., uri-reference).
     */
    controlID: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    setParameters?: SetParameterValue[];
    statements?: SpecificControlStatement[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this control requirement elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the control requirement can be used to reference the data item
     * locally or globally (e.g., in an imported OSCAL instance). This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid: string;
}

/**
 * Defines how the referenced component implements a set of controls.
 */
export interface ComponentControlImplementation {
    /**
     * A machine-oriented identifier reference to the component that is implemeting a given
     * control.
     */
    componentUUID: string;
    /**
     * An implementation statement that describes how a control or a control statement is
     * implemented within the referenced system component.
     */
    description: string;
    /**
     * Identifies content intended for external consumption, such as with leveraged
     * organizations.
     */
    export?: Export;
    implementationStatus?: ImplementationStatus;
    inherited?: InheritedControlImplementation[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    satisfied?: SatisfiedControlImplementationResponsibility[];
    setParameters?: SetParameterValue[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this by-component entry elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the by-component entry can be used to reference the data item
     * locally or globally (e.g., in an imported OSCAL instance). This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid: string;
}

/**
 * Identifies content intended for external consumption, such as with leveraged
 * organizations.
 */
export interface Export {
    /**
     * An implementation statement that describes the aspects of the control or control
     * statement implementation that can be available to another system leveraging this system.
     */
    description?: string;
    links?: Link[];
    props?: Property[];
    provided?: ProvidedControlImplementation[];
    remarks?: string;
    responsibilities?: ControlImplementationResponsibility[];
}

/**
 * Describes a capability which may be inherited by a leveraging system.
 */
export interface ProvidedControlImplementation {
    /**
     * An implementation statement that describes the aspects of the control or control
     * statement implementation that can be provided to another system leveraging this system.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this provided entry elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the provided entry can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Describes a control implementation responsibility imposed on a leveraging system.
 */
export interface ControlImplementationResponsibility {
    /**
     * An implementation statement that describes the aspects of the control or control
     * statement implementation that a leveraging system must implement to satisfy the control
     * provided by a leveraged system.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    /**
     * A machine-oriented identifier reference to an inherited control implementation that a
     * leveraging system is inheriting from a leveraged system.
     */
    providedUUID?: string;
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this responsibility elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the responsibility can be used to reference the data item locally or
     * globally (e.g., in an imported OSCAL instance). This UUID should be assigned per-subject,
     * which means it should be consistently used to identify the same subject across revisions
     * of the document.
     */
    uuid: string;
}

/**
 * Describes a control implementation inherited by a leveraging system.
 */
export interface InheritedControlImplementation {
    /**
     * An implementation statement that describes the aspects of a control or control statement
     * implementation that a leveraging system is inheriting from a leveraged system.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    /**
     * A machine-oriented identifier reference to an inherited control implementation that a
     * leveraging system is inheriting from a leveraged system.
     */
    providedUUID?: string;
    responsibleRoles?: ResponsibleRole[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this inherited entry elsewhere in this or other OSCAL instances. The locally
     * defined UUID of the inherited control implementation can be used to reference the data
     * item locally or globally (e.g., in an imported OSCAL instance). This UUID should be
     * assigned per-subject, which means it should be consistently used to identify the same
     * subject across revisions of the document.
     */
    uuid: string;
}

/**
 * Describes how this system satisfies a responsibility imposed by a leveraged system.
 */
export interface SatisfiedControlImplementationResponsibility {
    /**
     * An implementation statement that describes the aspects of a control or control statement
     * implementation that a leveraging system is implementing based on a requirement from a
     * leveraged system.
     */
    description: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    /**
     * A machine-oriented identifier reference to a control implementation that satisfies a
     * responsibility imposed by a leveraged system.
     */
    responsibilityUUID?: string;
    responsibleRoles?: ResponsibleRole[];
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this satisfied control implementation entry elsewhere in this or other OSCAL
     * instances. The locally defined UUID of the control implementation can be used to
     * reference the data item locally or globally (e.g., in an imported OSCAL instance). This
     * UUID should be assigned per-subject, which means it should be consistently used to
     * identify the same subject across revisions of the document.
     */
    uuid: string;
}

/**
 * Identifies which statements within a control are addressed.
 */
export interface SpecificControlStatement {
    byComponents?: ComponentControlImplementation[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
    responsibleRoles?: ResponsibleRole[];
    /**
     * A human-oriented identifier reference to a control statement.
     */
    statementID: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this control statement elsewhere in this or other OSCAL instances. The UUID
     * of the control statement in the source OSCAL instance is sufficient to reference the data
     * item locally or globally (e.g., in an imported OSCAL instance).
     */
    uuid: string;
}

/**
 * Used to import the OSCAL profile representing the system's control baseline.
 */
export interface ImportProfile {
    /**
     * A resolvable URL reference to the profile or catalog to use as the system's control
     * baseline.
     */
    href: string;
    remarks?: string;
}

/**
 * Contains the characteristics of the system, such as its name, purpose, and security
 * impact level.
 */
export interface SystemCharacteristics {
    authorizationBoundary: AuthorizationBoundary;
    dataFlow?: DataFlow;
    dateAuthorized?: string;
    /**
     * A summary of the system.
     */
    description: string;
    links?: Link[];
    networkArchitecture?: NetworkArchitecture;
    props?: Property[];
    remarks?: string;
    responsibleParties?: ResponsibleParty[];
    securityImpactLevel: SecurityImpactLevel;
    /**
     * The overall information system sensitivity categorization, such as defined by FIPS-199.
     */
    securitySensitivityLevel: string;
    status: SystemCharacteristicsStatus;
    systemIDS: SystemIdentification[];
    systemInformation: SystemInformation;
    /**
     * The full name of the system.
     */
    systemName: string;
    /**
     * A short name for the system, such as an acronym, that is suitable for display in a data
     * table or summary list.
     */
    systemNameShort?: string;
}

/**
 * A description of this system's authorization boundary, optionally supplemented by
 * diagrams that illustrate the authorization boundary.
 */
export interface AuthorizationBoundary {
    /**
     * A summary of the system's authorization boundary.
     */
    description: string;
    diagrams?: Diagram[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
}

/**
 * A graphic that provides a visual representation the system, or some aspect of it.
 */
export interface Diagram {
    /**
     * A brief caption to annotate the diagram.
     */
    caption?: string;
    /**
     * A summary of the diagram.
     */
    description?: string;
    links?: Link[];
    props?: Property[];
    remarks?: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this diagram elsewhere in this or other OSCAL instances. The locally defined
     * UUID of the diagram can be used to reference the data item locally or globally (e.g., in
     * an imported OSCAL instance). This UUID should be assigned per-subject, which means it
     * should be consistently used to identify the same subject across revisions of the document.
     */
    uuid: string;
}

/**
 * A description of the logical flow of information within the system and across its
 * boundaries, optionally supplemented by diagrams that illustrate these flows.
 */
export interface DataFlow {
    /**
     * A summary of the system's data flow.
     */
    description: string;
    diagrams?: Diagram[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
}

/**
 * A description of the system's network architecture, optionally supplemented by diagrams
 * that illustrate the network architecture.
 */
export interface NetworkArchitecture {
    /**
     * A summary of the system's network architecture.
     */
    description: string;
    diagrams?: Diagram[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
}

/**
 * The overall level of expected impact resulting from unauthorized disclosure,
 * modification, or loss of access to information.
 */
export interface SecurityImpactLevel {
    /**
     * A target-level of availability for the system, based on the sensitivity of information
     * within the system.
     */
    securityObjectiveAvailability: string;
    /**
     * A target-level of confidentiality for the system, based on the sensitivity of information
     * within the system.
     */
    securityObjectiveConfidentiality: string;
    /**
     * A target-level of integrity for the system, based on the sensitivity of information
     * within the system.
     */
    securityObjectiveIntegrity: string;
}

/**
 * Describes the operational status of the system.
 */
export interface SystemCharacteristicsStatus {
    remarks?: string;
    /**
     * The current operating status.
     */
    state: FluffyState;
}

/**
 * The current operating status.
 */
export enum FluffyState {
    Disposition = "disposition",
    Operational = "operational",
    Other = "other",
    UnderDevelopment = "under-development",
    UnderMajorModification = "under-major-modification",
}

/**
 * Contains details about all information types that are stored, processed, or transmitted
 * by the system, such as privacy information, and those defined in NIST SP 800-60.
 */
export interface SystemInformation {
    informationTypes: InformationType[];
    links?: Link[];
    props?: Property[];
}

/**
 * Contains details about one information type that is stored, processed, or transmitted by
 * the system, such as privacy information, and those defined in NIST SP 800-60.
 */
export interface InformationType {
    /**
     * The expected level of impact resulting from the disruption of access to or use of the
     * described information or the information system.
     */
    availabilityImpact: AvailabilityImpactLevel;
    categorizations?: InformationTypeCategorization[];
    /**
     * The expected level of impact resulting from the unauthorized disclosure of the described
     * information.
     */
    confidentialityImpact: ConfidentialityImpactLevel;
    /**
     * A summary of how this information type is used within the system.
     */
    description: string;
    /**
     * The expected level of impact resulting from the unauthorized modification of the
     * described information.
     */
    integrityImpact: IntegrityImpactLevel;
    links?: Link[];
    props?: Property[];
    /**
     * A human readable name for the information type. This title should be meaningful within
     * the context of the system.
     */
    title: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope that can be used
     * to reference this information type elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the information type can be used to reference the data item
     * locally or globally (e.g., in an imported OSCAL instance). This UUID should be assigned
     * per-subject, which means it should be consistently used to identify the same subject
     * across revisions of the document.
     */
    uuid?: string;
}

/**
 * The expected level of impact resulting from the disruption of access to or use of the
 * described information or the information system.
 */
export interface AvailabilityImpactLevel {
    adjustmentJustification?: string;
    base: string;
    links?: Link[];
    props?: Property[];
    selected?: string;
}

/**
 * A set of information type identifiers qualified by the given identification system used,
 * such as NIST SP 800-60.
 */
export interface InformationTypeCategorization {
    informationTypeIDS?: string[];
    /**
     * Specifies the information type identification system used.
     */
    system: string;
}

/**
 * The expected level of impact resulting from the unauthorized disclosure of the described
 * information.
 */
export interface ConfidentialityImpactLevel {
    adjustmentJustification?: string;
    base: string;
    links?: Link[];
    props?: Property[];
    selected?: string;
}

/**
 * The expected level of impact resulting from the unauthorized modification of the
 * described information.
 */
export interface IntegrityImpactLevel {
    adjustmentJustification?: string;
    base: string;
    links?: Link[];
    props?: Property[];
    selected?: string;
}

/**
 * Provides information as to how the system is implemented.
 */
export interface SystemImplementation {
    components: AssessmentAssetsComponent[];
    inventoryItems?: InventoryItem[];
    leveragedAuthorizations?: LeveragedAuthorization[];
    links?: Link[];
    props?: Property[];
    remarks?: string;
    users: SystemUser[];
}

/**
 * A description of another authorized system from which this system inherits capabilities
 * that satisfy security requirements. Another term for this concept is a common control
 * provider.
 */
export interface LeveragedAuthorization {
    dateAuthorized: string;
    links?: Link[];
    /**
     * A machine-oriented identifier reference to the party that manages the leveraged system.
     */
    partyUUID: string;
    props?: Property[];
    remarks?: string;
    /**
     * A human readable name for the leveraged authorization in the context of the system.
     */
    title: string;
    /**
     * A machine-oriented, globally unique identifier with cross-instance scope and can be used
     * to reference this leveraged authorization elsewhere in this or other OSCAL instances. The
     * locally defined UUID of the leveraged authorization can be used to reference the data
     * item locally or globally (e.g., in an imported OSCAL instance). This UUID should be
     * assigned per-subject, which means it should be consistently used to identify the same
     * subject across revisions of the document.
     */
    uuid: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toResult(json: string): Result {
        return cast(JSON.parse(json), r("Result"));
    }

    public static resultToJson(value: Result): string {
        return JSON.stringify(uncast(value, r("Result")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`,);
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) { }
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Result": o([
        { json: "catalog", js: "catalog", typ: u(undefined, r("Catalog")) },
        { json: "profile", js: "profile", typ: u(undefined, r("Profile")) },
        { json: "component-definition", js: "componentDefinition", typ: u(undefined, r("ComponentDefinition")) },
        { json: "system-security-plan", js: "systemSecurityPlan", typ: u(undefined, r("SystemSecurityPlanSSP")) },
        { json: "assessment-plan", js: "assessmentPlan", typ: u(undefined, r("SecurityAssessmentPlanSAP")) },
        { json: "assessment-results", js: "assessmentResults", typ: u(undefined, r("SecurityAssessmentResultsSAR")) },
        { json: "plan-of-action-and-milestones", js: "planOfActionAndMilestones", typ: u(undefined, r("PlanOfActionAndMilestonesPOAM")) },
    ], false),
    "SecurityAssessmentPlanSAP": o([
        { json: "assessment-assets", js: "assessmentAssets", typ: u(undefined, r("AssessmentAssets")) },
        { json: "assessment-subjects", js: "assessmentSubjects", typ: u(undefined, a(r("SubjectOfAssessment"))) },
        { json: "back-matter", js: "backMatter", typ: u(undefined, r("BackMatter")) },
        { json: "import-ssp", js: "importSSP", typ: r("ImportSystemSecurityPlan") },
        { json: "local-definitions", js: "localDefinitions", typ: u(undefined, r("AssessmentPlanLocalDefinitions")) },
        { json: "metadata", js: "metadata", typ: r("PublicationMetadata") },
        { json: "reviewed-controls", js: "reviewedControls", typ: r("ReviewedControlsAndControlObjectives") },
        { json: "tasks", js: "tasks", typ: u(undefined, a(r("Task"))) },
        { json: "terms-and-conditions", js: "termsAndConditions", typ: u(undefined, r("AssessmentPlanTermsAndConditions")) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "AssessmentAssets": o([
        { json: "assessment-platforms", js: "assessmentPlatforms", typ: a(r("AssessmentPlatform")) },
        { json: "components", js: "components", typ: u(undefined, a(r("AssessmentAssetsComponent"))) },
    ], false),
    "AssessmentPlatform": o([
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uses-components", js: "usesComponents", typ: u(undefined, a(r("UsesComponent"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Link": o([
        { json: "href", js: "href", typ: "" },
        { json: "media-type", js: "mediaType", typ: u(undefined, "") },
        { json: "rel", js: "rel", typ: u(undefined, "") },
        { json: "text", js: "text", typ: u(undefined, "") },
    ], false),
    "Property": o([
        { json: "class", js: "class", typ: u(undefined, "") },
        { json: "name", js: "name", typ: "" },
        { json: "ns", js: "ns", typ: u(undefined, "") },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: u(undefined, "") },
        { json: "value", js: "value", typ: "" },
    ], false),
    "UsesComponent": o([
        { json: "component-uuid", js: "componentUUID", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-parties", js: "responsibleParties", typ: u(undefined, a(r("ResponsibleParty"))) },
    ], false),
    "ResponsibleParty": o([
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "party-uuids", js: "partyUuids", typ: a("") },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "role-id", js: "roleID", typ: "" },
    ], false),
    "AssessmentAssetsComponent": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "protocols", js: "protocols", typ: u(undefined, a(r("ServiceProtocolInformation"))) },
        { json: "purpose", js: "purpose", typ: u(undefined, "") },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "status", js: "status", typ: r("ComponentStatus") },
        { json: "title", js: "title", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ServiceProtocolInformation": o([
        { json: "name", js: "name", typ: "" },
        { json: "port-ranges", js: "portRanges", typ: u(undefined, a(r("PortRange"))) },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: u(undefined, "") },
    ], false),
    "PortRange": o([
        { json: "end", js: "end", typ: u(undefined, 0) },
        { json: "start", js: "start", typ: u(undefined, 0) },
        { json: "transport", js: "transport", typ: u(undefined, r("Transport")) },
    ], false),
    "ResponsibleRole": o([
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "party-uuids", js: "partyUuids", typ: u(undefined, a("")) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "role-id", js: "roleID", typ: "" },
    ], false),
    "ComponentStatus": o([
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "state", js: "state", typ: r("PurpleState") },
    ], false),
    "SubjectOfAssessment": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "exclude-subjects", js: "excludeSubjects", typ: u(undefined, a(r("SelectAssessmentSubject"))) },
        { json: "include-all", js: "includeAll", typ: u(undefined, r("IncludeAll")) },
        { json: "include-subjects", js: "includeSubjects", typ: u(undefined, a(r("SelectAssessmentSubject"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "type", js: "type", typ: "" },
    ], false),
    "SelectAssessmentSubject": o([
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "subject-uuid", js: "subjectUUID", typ: "" },
        { json: "type", js: "type", typ: "" },
    ], false),
    "IncludeAll": o([
    ], false),
    "BackMatter": o([
        { json: "resources", js: "resources", typ: u(undefined, a(r("Resource"))) },
    ], false),
    "Resource": o([
        { json: "base64", js: "base64", typ: u(undefined, r("Base64")) },
        { json: "citation", js: "citation", typ: u(undefined, r("Citation")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "document-ids", js: "documentIDS", typ: u(undefined, a(r("DocumentIdentifier"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "rlinks", js: "rlinks", typ: u(undefined, a(r("ResourceLink"))) },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Base64": o([
        { json: "filename", js: "filename", typ: u(undefined, "") },
        { json: "media-type", js: "mediaType", typ: u(undefined, "") },
        { json: "value", js: "value", typ: "" },
    ], false),
    "Citation": o([
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "text", js: "text", typ: "" },
    ], false),
    "DocumentIdentifier": o([
        { json: "identifier", js: "identifier", typ: "" },
        { json: "scheme", js: "scheme", typ: u(undefined, "") },
    ], false),
    "ResourceLink": o([
        { json: "hashes", js: "hashes", typ: u(undefined, a(r("Hash"))) },
        { json: "href", js: "href", typ: "" },
        { json: "media-type", js: "mediaType", typ: u(undefined, "") },
    ], false),
    "Hash": o([
        { json: "algorithm", js: "algorithm", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "ImportSystemSecurityPlan": o([
        { json: "href", js: "href", typ: "" },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "AssessmentPlanLocalDefinitions": o([
        { json: "activities", js: "activities", typ: u(undefined, a(r("Activity"))) },
        { json: "components", js: "components", typ: u(undefined, a(r("AssessmentAssetsComponent"))) },
        { json: "inventory-items", js: "inventoryItems", typ: u(undefined, a(r("InventoryItem"))) },
        { json: "objectives-and-methods", js: "objectivesAndMethods", typ: u(undefined, a(r("AssessmentSpecificControlObjective"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "users", js: "users", typ: u(undefined, a(r("SystemUser"))) },
    ], false),
    "Activity": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "related-controls", js: "relatedControls", typ: u(undefined, r("ReviewedControlsAndControlObjectives")) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "steps", js: "steps", typ: u(undefined, a(r("Step"))) },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ReviewedControlsAndControlObjectives": o([
        { json: "control-objective-selections", js: "controlObjectiveSelections", typ: u(undefined, a(r("ReferencedControlObjectives"))) },
        { json: "control-selections", js: "controlSelections", typ: a(r("AssessedControls")) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "ReferencedControlObjectives": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "exclude-objectives", js: "excludeObjectives", typ: u(undefined, a(r("SelectObjective"))) },
        { json: "include-all", js: "includeAll", typ: u(undefined, r("IncludeAll")) },
        { json: "include-objectives", js: "includeObjectives", typ: u(undefined, a(r("SelectObjective"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "SelectObjective": o([
        { json: "objective-id", js: "objectiveID", typ: "" },
    ], false),
    "AssessedControls": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "exclude-controls", js: "excludeControls", typ: u(undefined, a(r("SelectControl"))) },
        { json: "include-all", js: "includeAll", typ: u(undefined, r("IncludeAll")) },
        { json: "include-controls", js: "includeControls", typ: u(undefined, a(r("SelectControl"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "SelectControl": o([
        { json: "control-id", js: "controlID", typ: "" },
        { json: "statement-ids", js: "statementIDS", typ: u(undefined, a("")) },
    ], false),
    "Step": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "reviewed-controls", js: "reviewedControls", typ: u(undefined, r("ReviewedControlsAndControlObjectives")) },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "InventoryItem": o([
        { json: "description", js: "description", typ: "" },
        { json: "implemented-components", js: "implementedComponents", typ: u(undefined, a(r("ImplementedComponent"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-parties", js: "responsibleParties", typ: u(undefined, a(r("ResponsibleParty"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ImplementedComponent": o([
        { json: "component-uuid", js: "componentUUID", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-parties", js: "responsibleParties", typ: u(undefined, a(r("ResponsibleParty"))) },
    ], false),
    "AssessmentSpecificControlObjective": o([
        { json: "control-id", js: "controlID", typ: "" },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "parts", js: "parts", typ: a(r("Part")) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "Part": o([
        { json: "class", js: "class", typ: u(undefined, "") },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "name", js: "name", typ: "" },
        { json: "ns", js: "ns", typ: u(undefined, "") },
        { json: "parts", js: "parts", typ: u(undefined, a(r("Part"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "prose", js: "prose", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
    ], false),
    "SystemUser": o([
        { json: "authorized-privileges", js: "authorizedPrivileges", typ: u(undefined, a(r("Privilege"))) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "role-ids", js: "roleIDS", typ: u(undefined, a("")) },
        { json: "short-name", js: "shortName", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Privilege": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "functions-performed", js: "functionsPerformed", typ: a("") },
        { json: "title", js: "title", typ: "" },
    ], false),
    "PublicationMetadata": o([
        { json: "document-ids", js: "documentIDS", typ: u(undefined, a(r("DocumentIdentifier"))) },
        { json: "last-modified", js: "lastModified", typ: Date },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "locations", js: "locations", typ: u(undefined, a(r("Location"))) },
        { json: "oscal-version", js: "oscalVersion", typ: "" },
        { json: "parties", js: "parties", typ: u(undefined, a(r("PartyOrganizationOrPerson"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "published", js: "published", typ: u(undefined, Date) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-parties", js: "responsibleParties", typ: u(undefined, a(r("ResponsibleParty"))) },
        { json: "revisions", js: "revisions", typ: u(undefined, a(r("RevisionHistoryEntry"))) },
        { json: "roles", js: "roles", typ: u(undefined, a(r("Role"))) },
        { json: "title", js: "title", typ: "" },
        { json: "version", js: "version", typ: "" },
    ], false),
    "Location": o([
        { json: "address", js: "address", typ: r("Address") },
        { json: "email-addresses", js: "emailAddresses", typ: u(undefined, a("")) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "telephone-numbers", js: "telephoneNumbers", typ: u(undefined, a(r("TelephoneNumber"))) },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "urls", js: "urls", typ: u(undefined, a("")) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Address": o([
        { json: "addr-lines", js: "addrLines", typ: u(undefined, a("")) },
        { json: "city", js: "city", typ: u(undefined, "") },
        { json: "country", js: "country", typ: u(undefined, "") },
        { json: "postal-code", js: "postalCode", typ: u(undefined, "") },
        { json: "state", js: "state", typ: u(undefined, "") },
        { json: "type", js: "type", typ: u(undefined, "") },
    ], false),
    "TelephoneNumber": o([
        { json: "number", js: "number", typ: "" },
        { json: "type", js: "type", typ: u(undefined, "") },
    ], false),
    "PartyOrganizationOrPerson": o([
        { json: "addresses", js: "addresses", typ: u(undefined, a(r("Address"))) },
        { json: "email-addresses", js: "emailAddresses", typ: u(undefined, a("")) },
        { json: "external-ids", js: "externalIDS", typ: u(undefined, a(r("PartyExternalIdentifier"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "location-uuids", js: "locationUuids", typ: u(undefined, a("")) },
        { json: "member-of-organizations", js: "memberOfOrganizations", typ: u(undefined, a("")) },
        { json: "name", js: "name", typ: u(undefined, "") },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "short-name", js: "shortName", typ: u(undefined, "") },
        { json: "telephone-numbers", js: "telephoneNumbers", typ: u(undefined, a(r("TelephoneNumber"))) },
        { json: "type", js: "type", typ: r("PartyType") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "PartyExternalIdentifier": o([
        { json: "id", js: "id", typ: "" },
        { json: "scheme", js: "scheme", typ: "" },
    ], false),
    "RevisionHistoryEntry": o([
        { json: "last-modified", js: "lastModified", typ: u(undefined, Date) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "oscal-version", js: "oscalVersion", typ: u(undefined, "") },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "published", js: "published", typ: u(undefined, Date) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "version", js: "version", typ: "" },
    ], false),
    "Role": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "id", js: "id", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "short-name", js: "shortName", typ: u(undefined, "") },
        { json: "title", js: "title", typ: "" },
    ], false),
    "Task": o([
        { json: "associated-activities", js: "associatedActivities", typ: u(undefined, a(r("AssociatedActivity"))) },
        { json: "dependencies", js: "dependencies", typ: u(undefined, a(r("TaskDependency"))) },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "subjects", js: "subjects", typ: u(undefined, a(r("SubjectOfAssessment"))) },
        { json: "tasks", js: "tasks", typ: u(undefined, a(r("Task"))) },
        { json: "timing", js: "timing", typ: u(undefined, r("EventTiming")) },
        { json: "title", js: "title", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "AssociatedActivity": o([
        { json: "activity-uuid", js: "activityUUID", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "subjects", js: "subjects", typ: a(r("SubjectOfAssessment")) },
    ], false),
    "TaskDependency": o([
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "task-uuid", js: "taskUUID", typ: "" },
    ], false),
    "EventTiming": o([
        { json: "at-frequency", js: "atFrequency", typ: u(undefined, r("FrequencyCondition")) },
        { json: "on-date", js: "onDate", typ: u(undefined, r("OnDateCondition")) },
        { json: "within-date-range", js: "withinDateRange", typ: u(undefined, r("OnDateRangeCondition")) },
    ], false),
    "FrequencyCondition": o([
        { json: "period", js: "period", typ: 0 },
        { json: "unit", js: "unit", typ: r("TimeUnit") },
    ], false),
    "OnDateCondition": o([
        { json: "date", js: "date", typ: Date },
    ], false),
    "OnDateRangeCondition": o([
        { json: "end", js: "end", typ: Date },
        { json: "start", js: "start", typ: Date },
    ], false),
    "AssessmentPlanTermsAndConditions": o([
        { json: "parts", js: "parts", typ: u(undefined, a(r("AssessmentPart"))) },
    ], false),
    "AssessmentPart": o([
        { json: "class", js: "class", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "name", js: "name", typ: "" },
        { json: "ns", js: "ns", typ: u(undefined, "") },
        { json: "parts", js: "parts", typ: u(undefined, a(r("AssessmentPart"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "prose", js: "prose", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: u(undefined, "") },
    ], false),
    "SecurityAssessmentResultsSAR": o([
        { json: "back-matter", js: "backMatter", typ: u(undefined, r("BackMatter")) },
        { json: "import-ap", js: "importAp", typ: r("ImportAssessmentPlan") },
        { json: "local-definitions", js: "localDefinitions", typ: u(undefined, r("AssessmentResultsLocalDefinitions")) },
        { json: "metadata", js: "metadata", typ: r("PublicationMetadata") },
        { json: "results", js: "results", typ: a(r("AssessmentResult")) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ImportAssessmentPlan": o([
        { json: "href", js: "href", typ: "" },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "AssessmentResultsLocalDefinitions": o([
        { json: "activities", js: "activities", typ: u(undefined, a(r("Activity"))) },
        { json: "objectives-and-methods", js: "objectivesAndMethods", typ: u(undefined, a(r("AssessmentSpecificControlObjective"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "AssessmentResult": o([
        { json: "assessment-log", js: "assessmentLog", typ: u(undefined, r("AssessmentLog")) },
        { json: "attestations", js: "attestations", typ: u(undefined, a(r("AttestationStatements"))) },
        { json: "description", js: "description", typ: "" },
        { json: "end", js: "end", typ: u(undefined, Date) },
        { json: "findings", js: "findings", typ: u(undefined, a(r("Finding"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "local-definitions", js: "localDefinitions", typ: u(undefined, r("ResultLocalDefinitions")) },
        { json: "observations", js: "observations", typ: u(undefined, a(r("Observation"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "reviewed-controls", js: "reviewedControls", typ: r("ReviewedControlsAndControlObjectives") },
        { json: "risks", js: "risks", typ: u(undefined, a(r("IdentifiedRisk"))) },
        { json: "start", js: "start", typ: Date },
        { json: "title", js: "title", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "AssessmentLog": o([
        { json: "entries", js: "entries", typ: a(r("AssessmentLogEntry")) },
    ], false),
    "AssessmentLogEntry": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "end", js: "end", typ: u(undefined, Date) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "logged-by", js: "loggedBy", typ: u(undefined, a(r("LoggedBy"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "related-tasks", js: "relatedTasks", typ: u(undefined, a(r("TaskReference"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "start", js: "start", typ: Date },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "LoggedBy": o([
        { json: "party-uuid", js: "partyUUID", typ: "" },
        { json: "role-id", js: "roleID", typ: u(undefined, "") },
    ], false),
    "TaskReference": o([
        { json: "identified-subject", js: "identifiedSubject", typ: u(undefined, r("IdentifiedSubject")) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-parties", js: "responsibleParties", typ: u(undefined, a(r("ResponsibleParty"))) },
        { json: "subjects", js: "subjects", typ: u(undefined, a(r("SubjectOfAssessment"))) },
        { json: "task-uuid", js: "taskUUID", typ: "" },
    ], false),
    "IdentifiedSubject": o([
        { json: "subject-placeholder-uuid", js: "subjectPlaceholderUUID", typ: "" },
        { json: "subjects", js: "subjects", typ: a(r("SubjectOfAssessment")) },
    ], false),
    "AttestationStatements": o([
        { json: "parts", js: "parts", typ: a(r("AssessmentPart")) },
        { json: "responsible-parties", js: "responsibleParties", typ: u(undefined, a(r("ResponsibleParty"))) },
    ], false),
    "Finding": o([
        { json: "description", js: "description", typ: "" },
        { json: "implementation-statement-uuid", js: "implementationStatementUUID", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "origins", js: "origins", typ: u(undefined, a(r("FindingOrigin"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "related-observations", js: "relatedObservations", typ: u(undefined, a(r("FindingRelatedObservation"))) },
        { json: "related-risks", js: "relatedRisks", typ: u(undefined, a(r("FindingRelatedRisk"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "target", js: "target", typ: r("TargetClass") },
        { json: "title", js: "title", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "FindingOrigin": o([
        { json: "actors", js: "actors", typ: a(r("OriginatingActor")) },
        { json: "related-tasks", js: "relatedTasks", typ: u(undefined, a(r("TaskReference"))) },
    ], false),
    "OriginatingActor": o([
        { json: "actor-uuid", js: "actorUUID", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "role-id", js: "roleID", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("ActorType") },
    ], false),
    "FindingRelatedObservation": o([
        { json: "observation-uuid", js: "observationUUID", typ: "" },
    ], false),
    "FindingRelatedRisk": o([
        { json: "risk-uuid", js: "riskUUID", typ: "" },
    ], false),
    "TargetClass": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "implementation-status", js: "implementationStatus", typ: u(undefined, r("ImplementationStatus")) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "status", js: "status", typ: r("StatusClass") },
        { json: "target-id", js: "targetID", typ: "" },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "type", js: "type", typ: r("FindingTargetType") },
    ], false),
    "ImplementationStatus": o([
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "state", js: "state", typ: "" },
    ], false),
    "StatusClass": o([
        { json: "reason", js: "reason", typ: u(undefined, "") },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "state", js: "state", typ: r("ObjectiveStatusState") },
    ], false),
    "ResultLocalDefinitions": o([
        { json: "assessment-assets", js: "assessmentAssets", typ: u(undefined, r("AssessmentAssets")) },
        { json: "components", js: "components", typ: u(undefined, a(r("AssessmentAssetsComponent"))) },
        { json: "inventory-items", js: "inventoryItems", typ: u(undefined, a(r("InventoryItem"))) },
        { json: "tasks", js: "tasks", typ: u(undefined, a(r("Task"))) },
        { json: "users", js: "users", typ: u(undefined, a(r("SystemUser"))) },
    ], false),
    "Observation": o([
        { json: "collected", js: "collected", typ: Date },
        { json: "description", js: "description", typ: "" },
        { json: "expires", js: "expires", typ: u(undefined, Date) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "methods", js: "methods", typ: a("") },
        { json: "origins", js: "origins", typ: u(undefined, a(r("FindingOrigin"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "relevant-evidence", js: "relevantEvidence", typ: u(undefined, a(r("RelevantEvidence"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "subjects", js: "subjects", typ: u(undefined, a(r("IdentifiesTheSubject"))) },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "types", js: "types", typ: u(undefined, a("")) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "RelevantEvidence": o([
        { json: "description", js: "description", typ: "" },
        { json: "href", js: "href", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "IdentifiesTheSubject": o([
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "subject-uuid", js: "subjectUUID", typ: "" },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "type", js: "type", typ: "" },
    ], false),
    "IdentifiedRisk": o([
        { json: "characterizations", js: "characterizations", typ: u(undefined, a(r("Characterization"))) },
        { json: "deadline", js: "deadline", typ: u(undefined, Date) },
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "mitigating-factors", js: "mitigatingFactors", typ: u(undefined, a(r("MitigatingFactor"))) },
        { json: "origins", js: "origins", typ: u(undefined, a(r("FindingOrigin"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "related-observations", js: "relatedObservations", typ: u(undefined, a(r("RiskRelatedObservation"))) },
        { json: "remediations", js: "remediations", typ: u(undefined, a(r("RiskResponse"))) },
        { json: "risk-log", js: "riskLog", typ: u(undefined, r("RiskLog")) },
        { json: "statement", js: "statement", typ: "" },
        { json: "status", js: "status", typ: "" },
        { json: "threat-ids", js: "threatIDS", typ: u(undefined, a(r("ThreatID"))) },
        { json: "title", js: "title", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Characterization": o([
        { json: "facets", js: "facets", typ: a(r("Facet")) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "origin", js: "origin", typ: r("FindingOrigin") },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
    ], false),
    "Facet": o([
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "name", js: "name", typ: "" },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "system", js: "system", typ: "" },
        { json: "value", js: "value", typ: "" },
    ], false),
    "MitigatingFactor": o([
        { json: "description", js: "description", typ: "" },
        { json: "implementation-uuid", js: "implementationUUID", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "subjects", js: "subjects", typ: u(undefined, a(r("IdentifiesTheSubject"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "RiskRelatedObservation": o([
        { json: "observation-uuid", js: "observationUUID", typ: "" },
    ], false),
    "RiskResponse": o([
        { json: "description", js: "description", typ: "" },
        { json: "lifecycle", js: "lifecycle", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "origins", js: "origins", typ: u(undefined, a(r("FindingOrigin"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "required-assets", js: "requiredAssets", typ: u(undefined, a(r("RequiredAsset"))) },
        { json: "tasks", js: "tasks", typ: u(undefined, a(r("Task"))) },
        { json: "title", js: "title", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "RequiredAsset": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "subjects", js: "subjects", typ: u(undefined, a(r("IdentifiesTheSubject"))) },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "RiskLog": o([
        { json: "entries", js: "entries", typ: a(r("RiskLogEntry")) },
    ], false),
    "RiskLogEntry": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "end", js: "end", typ: u(undefined, Date) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "logged-by", js: "loggedBy", typ: u(undefined, a(r("LoggedBy"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "related-responses", js: "relatedResponses", typ: u(undefined, a(r("RiskResponseReference"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "start", js: "start", typ: Date },
        { json: "status-change", js: "statusChange", typ: u(undefined, "") },
        { json: "title", js: "title", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "RiskResponseReference": o([
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "related-tasks", js: "relatedTasks", typ: u(undefined, a(r("TaskReference"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "response-uuid", js: "responseUUID", typ: "" },
    ], false),
    "ThreatID": o([
        { json: "href", js: "href", typ: u(undefined, "") },
        { json: "id", js: "id", typ: "" },
        { json: "system", js: "system", typ: "" },
    ], false),
    "Catalog": o([
        { json: "back-matter", js: "backMatter", typ: u(undefined, r("BackMatter")) },
        { json: "controls", js: "controls", typ: u(undefined, a(r("Control"))) },
        { json: "groups", js: "groups", typ: u(undefined, a(r("ControlGroup"))) },
        { json: "metadata", js: "metadata", typ: r("PublicationMetadata") },
        { json: "params", js: "params", typ: u(undefined, a(r("Parameter"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Control": o([
        { json: "class", js: "class", typ: u(undefined, "") },
        { json: "controls", js: "controls", typ: u(undefined, a(r("Control"))) },
        { json: "id", js: "id", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "params", js: "params", typ: u(undefined, a(r("Parameter"))) },
        { json: "parts", js: "parts", typ: u(undefined, a(r("Part"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "title", js: "title", typ: "" },
    ], false),
    "Parameter": o([
        { json: "class", js: "class", typ: u(undefined, "") },
        { json: "constraints", js: "constraints", typ: u(undefined, a(r("Constraint"))) },
        { json: "depends-on", js: "dependsOn", typ: u(undefined, "") },
        { json: "guidelines", js: "guidelines", typ: u(undefined, a(r("Guideline"))) },
        { json: "id", js: "id", typ: "" },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "select", js: "select", typ: u(undefined, r("Selection")) },
        { json: "usage", js: "usage", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], false),
    "Constraint": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "tests", js: "tests", typ: u(undefined, a(r("ConstraintTest"))) },
    ], false),
    "ConstraintTest": o([
        { json: "expression", js: "expression", typ: "" },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "Guideline": o([
        { json: "prose", js: "prose", typ: "" },
    ], false),
    "Selection": o([
        { json: "choice", js: "choice", typ: u(undefined, a("")) },
        { json: "how-many", js: "howMany", typ: u(undefined, r("ParameterCardinality")) },
    ], false),
    "ControlGroup": o([
        { json: "class", js: "class", typ: u(undefined, "") },
        { json: "controls", js: "controls", typ: u(undefined, a(r("Control"))) },
        { json: "groups", js: "groups", typ: u(undefined, a(r("ControlGroup"))) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "params", js: "params", typ: u(undefined, a(r("Parameter"))) },
        { json: "parts", js: "parts", typ: u(undefined, a(r("Part"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "title", js: "title", typ: "" },
    ], false),
    "ComponentDefinition": o([
        { json: "back-matter", js: "backMatter", typ: u(undefined, r("BackMatter")) },
        { json: "capabilities", js: "capabilities", typ: u(undefined, a(r("Capability"))) },
        { json: "components", js: "components", typ: u(undefined, a(r("ComponentDefinitionComponent"))) },
        { json: "import-component-definitions", js: "importComponentDefinitions", typ: u(undefined, a(r("ImportComponentDefinition"))) },
        { json: "metadata", js: "metadata", typ: r("PublicationMetadata") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Capability": o([
        { json: "control-implementations", js: "controlImplementations", typ: u(undefined, a(r("ControlImplementationSet"))) },
        { json: "description", js: "description", typ: "" },
        { json: "incorporates-components", js: "incorporatesComponents", typ: u(undefined, a(r("IncorporatesComponent"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "name", js: "name", typ: "" },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ControlImplementationSet": o([
        { json: "description", js: "description", typ: "" },
        { json: "implemented-requirements", js: "implementedRequirements", typ: a(r("ImplementedRequirementElement")) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "set-parameters", js: "setParameters", typ: u(undefined, a(r("SetParameterValue"))) },
        { json: "source", js: "source", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ImplementedRequirementElement": o([
        { json: "control-id", js: "controlID", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "set-parameters", js: "setParameters", typ: u(undefined, a(r("SetParameterValue"))) },
        { json: "statements", js: "statements", typ: u(undefined, a(r("ControlStatementImplementation"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "SetParameterValue": o([
        { json: "param-id", js: "paramID", typ: "" },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "values", js: "values", typ: a("") },
    ], false),
    "ControlStatementImplementation": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "statement-id", js: "statementID", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "IncorporatesComponent": o([
        { json: "component-uuid", js: "componentUUID", typ: "" },
        { json: "description", js: "description", typ: "" },
    ], false),
    "ComponentDefinitionComponent": o([
        { json: "control-implementations", js: "controlImplementations", typ: u(undefined, a(r("ControlImplementationSet"))) },
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "protocols", js: "protocols", typ: u(undefined, a(r("ServiceProtocolInformation"))) },
        { json: "purpose", js: "purpose", typ: u(undefined, "") },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "title", js: "title", typ: "" },
        { json: "type", js: "type", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ImportComponentDefinition": o([
        { json: "href", js: "href", typ: "" },
    ], false),
    "PlanOfActionAndMilestonesPOAM": o([
        { json: "back-matter", js: "backMatter", typ: u(undefined, r("BackMatter")) },
        { json: "import-ssp", js: "importSSP", typ: u(undefined, r("ImportSystemSecurityPlan")) },
        { json: "local-definitions", js: "localDefinitions", typ: u(undefined, r("PlanOfActionAndMilestonesLocalDefinitions")) },
        { json: "metadata", js: "metadata", typ: r("PublicationMetadata") },
        { json: "observations", js: "observations", typ: u(undefined, a(r("Observation"))) },
        { json: "poam-items", js: "poamItems", typ: a(r("POAMItem")) },
        { json: "risks", js: "risks", typ: u(undefined, a(r("IdentifiedRisk"))) },
        { json: "system-id", js: "systemID", typ: u(undefined, r("SystemIdentification")) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "PlanOfActionAndMilestonesLocalDefinitions": o([
        { json: "components", js: "components", typ: u(undefined, a(r("AssessmentAssetsComponent"))) },
        { json: "inventory-items", js: "inventoryItems", typ: u(undefined, a(r("InventoryItem"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "POAMItem": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "origins", js: "origins", typ: u(undefined, a(r("PoamItemOrigin"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "related-observations", js: "relatedObservations", typ: u(undefined, a(r("PoamItemRelatedObservation"))) },
        { json: "related-risks", js: "relatedRisks", typ: u(undefined, a(r("PoamItemRelatedRisk"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "title", js: "title", typ: "" },
        { json: "uuid", js: "uuid", typ: u(undefined, "") },
    ], false),
    "PoamItemOrigin": o([
        { json: "actors", js: "actors", typ: a(r("OriginatingActor")) },
    ], false),
    "PoamItemRelatedObservation": o([
        { json: "observation-uuid", js: "observationUUID", typ: "" },
    ], false),
    "PoamItemRelatedRisk": o([
        { json: "risk-uuid", js: "riskUUID", typ: "" },
    ], false),
    "SystemIdentification": o([
        { json: "id", js: "id", typ: "" },
        { json: "identifier-type", js: "identifierType", typ: u(undefined, "") },
    ], false),
    "Profile": o([
        { json: "back-matter", js: "backMatter", typ: u(undefined, r("BackMatter")) },
        { json: "imports", js: "imports", typ: a(r("ImportResource")) },
        { json: "merge", js: "merge", typ: u(undefined, r("MergeControls")) },
        { json: "metadata", js: "metadata", typ: r("PublicationMetadata") },
        { json: "modify", js: "modify", typ: u(undefined, r("ModifyControls")) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ImportResource": o([
        { json: "exclude-controls", js: "excludeControls", typ: u(undefined, a(r("Call"))) },
        { json: "href", js: "href", typ: "" },
        { json: "include-all", js: "includeAll", typ: u(undefined, r("IncludeAll")) },
        { json: "include-controls", js: "includeControls", typ: u(undefined, a(r("Call"))) },
    ], false),
    "Call": o([
        { json: "matching", js: "matching", typ: u(undefined, a(r("MatchControlsByPattern"))) },
        { json: "with-child-controls", js: "withChildControls", typ: u(undefined, r("IncludeContainedControlsWithControl")) },
        { json: "with-ids", js: "withIDS", typ: u(undefined, a("")) },
    ], false),
    "MatchControlsByPattern": o([
        { json: "pattern", js: "pattern", typ: u(undefined, "") },
    ], false),
    "MergeControls": o([
        { json: "as-is", js: "asIs", typ: u(undefined, true) },
        { json: "combine", js: "combine", typ: u(undefined, r("CombinationRule")) },
        { json: "custom", js: "custom", typ: u(undefined, r("CustomGrouping")) },
        { json: "flat", js: "flat", typ: u(undefined, r("Flat")) },
    ], false),
    "CombinationRule": o([
        { json: "method", js: "method", typ: u(undefined, r("CombinationMethod")) },
    ], false),
    "CustomGrouping": o([
        { json: "groups", js: "groups", typ: u(undefined, a(r("CustomGroup"))) },
        { json: "insert-controls", js: "insertControls", typ: u(undefined, a(r("SelectControls"))) },
    ], false),
    "CustomGroup": o([
        { json: "class", js: "class", typ: u(undefined, "") },
        { json: "groups", js: "groups", typ: u(undefined, a(r("CustomGroup"))) },
        { json: "id", js: "id", typ: u(undefined, "") },
        { json: "insert-controls", js: "insertControls", typ: u(undefined, a(r("SelectControls"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "params", js: "params", typ: u(undefined, a(r("Parameter"))) },
        { json: "parts", js: "parts", typ: u(undefined, a(r("Part"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "title", js: "title", typ: "" },
    ], false),
    "SelectControls": o([
        { json: "exclude-controls", js: "excludeControls", typ: u(undefined, a(r("Call"))) },
        { json: "include-all", js: "includeAll", typ: u(undefined, r("IncludeAll")) },
        { json: "include-controls", js: "includeControls", typ: u(undefined, a(r("Call"))) },
        { json: "order", js: "order", typ: u(undefined, r("Order")) },
    ], false),
    "Flat": o([
    ], false),
    "ModifyControls": o([
        { json: "alters", js: "alters", typ: u(undefined, a(r("Alteration"))) },
        { json: "set-parameters", js: "setParameters", typ: u(undefined, a(r("ParameterSetting"))) },
    ], false),
    "Alteration": o([
        { json: "adds", js: "adds", typ: u(undefined, a(r("Addition"))) },
        { json: "control-id", js: "controlID", typ: "" },
        { json: "removes", js: "removes", typ: u(undefined, a(r("Removal"))) },
    ], false),
    "Addition": o([
        { json: "by-id", js: "byID", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "params", js: "params", typ: u(undefined, a(r("Parameter"))) },
        { json: "parts", js: "parts", typ: u(undefined, a(r("Part"))) },
        { json: "position", js: "position", typ: u(undefined, r("Position")) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "title", js: "title", typ: u(undefined, "") },
    ], false),
    "Removal": o([
        { json: "by-class", js: "byClass", typ: u(undefined, "") },
        { json: "by-id", js: "byID", typ: u(undefined, "") },
        { json: "by-item-name", js: "byItemName", typ: u(undefined, "") },
        { json: "by-name", js: "byName", typ: u(undefined, "") },
        { json: "by-ns", js: "byNS", typ: u(undefined, "") },
    ], false),
    "ParameterSetting": o([
        { json: "class", js: "class", typ: u(undefined, "") },
        { json: "constraints", js: "constraints", typ: u(undefined, a(r("Constraint"))) },
        { json: "depends-on", js: "dependsOn", typ: u(undefined, "") },
        { json: "guidelines", js: "guidelines", typ: u(undefined, a(r("Guideline"))) },
        { json: "label", js: "label", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "param-id", js: "paramID", typ: "" },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "select", js: "select", typ: u(undefined, r("Selection")) },
        { json: "usage", js: "usage", typ: u(undefined, "") },
        { json: "values", js: "values", typ: u(undefined, a("")) },
    ], false),
    "SystemSecurityPlanSSP": o([
        { json: "back-matter", js: "backMatter", typ: u(undefined, r("BackMatter")) },
        { json: "control-implementation", js: "controlImplementation", typ: r("ControlImplementationClass") },
        { json: "import-profile", js: "importProfile", typ: r("ImportProfile") },
        { json: "metadata", js: "metadata", typ: r("PublicationMetadata") },
        { json: "system-characteristics", js: "systemCharacteristics", typ: r("SystemCharacteristics") },
        { json: "system-implementation", js: "systemImplementation", typ: r("SystemImplementation") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ControlImplementationClass": o([
        { json: "description", js: "description", typ: "" },
        { json: "implemented-requirements", js: "implementedRequirements", typ: a(r("ControlBasedRequirement")) },
        { json: "set-parameters", js: "setParameters", typ: u(undefined, a(r("SetParameterValue"))) },
    ], false),
    "ControlBasedRequirement": o([
        { json: "by-components", js: "byComponents", typ: u(undefined, a(r("ComponentControlImplementation"))) },
        { json: "control-id", js: "controlID", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "set-parameters", js: "setParameters", typ: u(undefined, a(r("SetParameterValue"))) },
        { json: "statements", js: "statements", typ: u(undefined, a(r("SpecificControlStatement"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ComponentControlImplementation": o([
        { json: "component-uuid", js: "componentUUID", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "export", js: "export", typ: u(undefined, r("Export")) },
        { json: "implementation-status", js: "implementationStatus", typ: u(undefined, r("ImplementationStatus")) },
        { json: "inherited", js: "inherited", typ: u(undefined, a(r("InheritedControlImplementation"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "satisfied", js: "satisfied", typ: u(undefined, a(r("SatisfiedControlImplementationResponsibility"))) },
        { json: "set-parameters", js: "setParameters", typ: u(undefined, a(r("SetParameterValue"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Export": o([
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "provided", js: "provided", typ: u(undefined, a(r("ProvidedControlImplementation"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsibilities", js: "responsibilities", typ: u(undefined, a(r("ControlImplementationResponsibility"))) },
    ], false),
    "ProvidedControlImplementation": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ControlImplementationResponsibility": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "provided-uuid", js: "providedUUID", typ: u(undefined, "") },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "InheritedControlImplementation": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "provided-uuid", js: "providedUUID", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "SatisfiedControlImplementationResponsibility": o([
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsibility-uuid", js: "responsibilityUUID", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "SpecificControlStatement": o([
        { json: "by-components", js: "byComponents", typ: u(undefined, a(r("ComponentControlImplementation"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-roles", js: "responsibleRoles", typ: u(undefined, a(r("ResponsibleRole"))) },
        { json: "statement-id", js: "statementID", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "ImportProfile": o([
        { json: "href", js: "href", typ: "" },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "SystemCharacteristics": o([
        { json: "authorization-boundary", js: "authorizationBoundary", typ: r("AuthorizationBoundary") },
        { json: "data-flow", js: "dataFlow", typ: u(undefined, r("DataFlow")) },
        { json: "date-authorized", js: "dateAuthorized", typ: u(undefined, "") },
        { json: "description", js: "description", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "network-architecture", js: "networkArchitecture", typ: u(undefined, r("NetworkArchitecture")) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "responsible-parties", js: "responsibleParties", typ: u(undefined, a(r("ResponsibleParty"))) },
        { json: "security-impact-level", js: "securityImpactLevel", typ: r("SecurityImpactLevel") },
        { json: "security-sensitivity-level", js: "securitySensitivityLevel", typ: "" },
        { json: "status", js: "status", typ: r("SystemCharacteristicsStatus") },
        { json: "system-ids", js: "systemIDS", typ: a(r("SystemIdentification")) },
        { json: "system-information", js: "systemInformation", typ: r("SystemInformation") },
        { json: "system-name", js: "systemName", typ: "" },
        { json: "system-name-short", js: "systemNameShort", typ: u(undefined, "") },
    ], false),
    "AuthorizationBoundary": o([
        { json: "description", js: "description", typ: "" },
        { json: "diagrams", js: "diagrams", typ: u(undefined, a(r("Diagram"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "Diagram": o([
        { json: "caption", js: "caption", typ: u(undefined, "") },
        { json: "description", js: "description", typ: u(undefined, "") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "DataFlow": o([
        { json: "description", js: "description", typ: "" },
        { json: "diagrams", js: "diagrams", typ: u(undefined, a(r("Diagram"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "NetworkArchitecture": o([
        { json: "description", js: "description", typ: "" },
        { json: "diagrams", js: "diagrams", typ: u(undefined, a(r("Diagram"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
    ], false),
    "SecurityImpactLevel": o([
        { json: "security-objective-availability", js: "securityObjectiveAvailability", typ: "" },
        { json: "security-objective-confidentiality", js: "securityObjectiveConfidentiality", typ: "" },
        { json: "security-objective-integrity", js: "securityObjectiveIntegrity", typ: "" },
    ], false),
    "SystemCharacteristicsStatus": o([
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "state", js: "state", typ: r("FluffyState") },
    ], false),
    "SystemInformation": o([
        { json: "information-types", js: "informationTypes", typ: a(r("InformationType")) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
    ], false),
    "InformationType": o([
        { json: "availability-impact", js: "availabilityImpact", typ: r("AvailabilityImpactLevel") },
        { json: "categorizations", js: "categorizations", typ: u(undefined, a(r("InformationTypeCategorization"))) },
        { json: "confidentiality-impact", js: "confidentialityImpact", typ: r("ConfidentialityImpactLevel") },
        { json: "description", js: "description", typ: "" },
        { json: "integrity-impact", js: "integrityImpact", typ: r("IntegrityImpactLevel") },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "title", js: "title", typ: "" },
        { json: "uuid", js: "uuid", typ: u(undefined, "") },
    ], false),
    "AvailabilityImpactLevel": o([
        { json: "adjustment-justification", js: "adjustmentJustification", typ: u(undefined, "") },
        { json: "base", js: "base", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "selected", js: "selected", typ: u(undefined, "") },
    ], false),
    "InformationTypeCategorization": o([
        { json: "information-type-ids", js: "informationTypeIDS", typ: u(undefined, a("")) },
        { json: "system", js: "system", typ: "" },
    ], false),
    "ConfidentialityImpactLevel": o([
        { json: "adjustment-justification", js: "adjustmentJustification", typ: u(undefined, "") },
        { json: "base", js: "base", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "selected", js: "selected", typ: u(undefined, "") },
    ], false),
    "IntegrityImpactLevel": o([
        { json: "adjustment-justification", js: "adjustmentJustification", typ: u(undefined, "") },
        { json: "base", js: "base", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "selected", js: "selected", typ: u(undefined, "") },
    ], false),
    "SystemImplementation": o([
        { json: "components", js: "components", typ: a(r("AssessmentAssetsComponent")) },
        { json: "inventory-items", js: "inventoryItems", typ: u(undefined, a(r("InventoryItem"))) },
        { json: "leveraged-authorizations", js: "leveragedAuthorizations", typ: u(undefined, a(r("LeveragedAuthorization"))) },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "users", js: "users", typ: a(r("SystemUser")) },
    ], false),
    "LeveragedAuthorization": o([
        { json: "date-authorized", js: "dateAuthorized", typ: "" },
        { json: "links", js: "links", typ: u(undefined, a(r("Link"))) },
        { json: "party-uuid", js: "partyUUID", typ: "" },
        { json: "props", js: "props", typ: u(undefined, a(r("Property"))) },
        { json: "remarks", js: "remarks", typ: u(undefined, "") },
        { json: "title", js: "title", typ: "" },
        { json: "uuid", js: "uuid", typ: "" },
    ], false),
    "Transport": [
        "TCP",
        "UDP",
    ],
    "PurpleState": [
        "disposition",
        "operational",
        "other",
        "under-development",
    ],
    "PartyType": [
        "organization",
        "person",
    ],
    "TimeUnit": [
        "days",
        "hours",
        "minutes",
        "months",
        "seconds",
        "years",
    ],
    "ActorType": [
        "assessment-platform",
        "party",
        "tool",
    ],
    "ObjectiveStatusState": [
        "not-satisfied",
        "satisfied",
    ],
    "FindingTargetType": [
        "objective-id",
        "statement-id",
    ],
    "ParameterCardinality": [
        "one",
        "one-or-more",
    ],
    "IncludeContainedControlsWithControl": [
        "no",
        "yes",
    ],
    "CombinationMethod": [
        "keep",
        "merge",
        "use-first",
    ],
    "Order": [
        "ascending",
        "descending",
        "keep",
    ],
    "Position": [
        "after",
        "before",
        "ending",
        "starting",
    ],
    "FluffyState": [
        "disposition",
        "operational",
        "other",
        "under-development",
        "under-major-modification",
    ],
};
