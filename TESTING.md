# Testing Plan for the OSCAL Catalog Authoring Tool

## Executive Summary

NIST software developers commit to quality standards in the production of research software, particularly as indicated by policies [S1801.3, "Review of Research Software Intended for Publication"](https://inet.nist.gov/files/final-s-180103-ver-3pdf/pdf) and [S6106.01 "Open Source Code"](https://inet.nist.gov/files/pdf/finals610601ver1).

To that end, this plan documents our conformance to these policies and additional policies, procedures, and best practices of NIST ITL CSD staff.

## Local Developer Testing

### Linting

Developers of this project make use of [`eslint`](https://eslint.org/) for linting the application's source code. The developers execute the linter during development locally on their workstations with recommended rulesets configured for industry best practice, with a minimal set of exempted rules. Rulesets and exemptions are maintained in the source code version control system (GitHub) in the [`.eslintrc`](./OSCAL-CAT-App/.eslintrc) configuration file.

Future work is planned to not only perform linting locally, but as [part of the continuous integration process](#continuous-integration-and-continuous-deployment-cicd-testing) as well. See the work item [#50](https://github.com/usnistgov/oscal-cat/issues/50) for details.

### Unit Testing

The developers of this application use the [Angular Framework and its test scaffolding](https://angular.io/guide/testing), which generates the unit test scaffolds for the different Angular components. These unit tests implemented with the popular [Jasmine test framework for Javascript and Typescript](https://jasmine.github.io/) and run in aggregate with the [`karma` test runner](https://karma-runner.github.io/latest/index.html). Developers execute the unit tests during development locally on their workstations and as part of the code review process.

Future work is planned to not only perform unit testing locally, but as [part of the continuous integration process](#continuous-integration-and-continuous-deployment-cicd-testing) as well. See the work item [#49](https://github.com/usnistgov/oscal-cat/issues/49) for details.

### Integration Testing

The developers of this application use the [Angular Framework and its test scaffolding](https://angular.io/guide/testing), which generates the integration test scaffold for the different Angular-based web application. The integration tests run the application to execute tests implemented with the popular [Jasmine test framework for Javascript and Typescript](https://jasmine.github.io/). The tests interact with the application using a programatically controlled and instrumented installation of the Chrome web browser using [Protractor](https://www.protractortest.org/) via [Angular's command line utility's `ng e2e` command](https://angular.io/cli/e2e). The integration tests are in the [`e2e` directory of application source code](./OSCAL-CAT-App/e2e/) and the configuration of the integration tests are in the [`protractor.conf` configuration file](./OSCAL-CAT-App/e2e/protractor.conf.js). Developers execute the integration tests during development locally on their workstations and as part of the code review process.

Future work is planned to not only perform integration testing locally, but as [part of the continuous integration process](#continuous-integration-and-continuous-deployment-cicd-testing) as well. See the work item [#51](https://github.com/usnistgov/oscal-cat/issues/51) for details.

### Manual Code Review

Developers in the project's development team perform code review of different change requests before the change is applied to the main stable collection of application source code files (`git` branch) that is ready for release or consumption by OSCAL community stakeholders.

Example of past, present, and future code review activies, especially documented inquries and constructive feedback for the changes, can be found in [the project's code change request listing](https://github.com/usnistgov/oscal-cat/pulls).

Developers have [configured the version control system's code change request feature](https://github.com/usnistgov/oscal-cat/settings/branches) to require code review and approval before merging changes to the stable collection of application source code files (`git` branch) that is ready for release or consumption by OSCAL community stakeholders.

## Continuous Integration and Continuous Deployment (CI/CD) Testing

### Static Analysis

The development team is not currently performing static analysis of the application's source code. However, the development team has a work item in the backlog [to configure GitHub's CodeQL service](https://github.com/usnistgov/oscal-cat/issues/38) for this purpose after open-sourcing the application's source code and its repository is therefore publicly available. (Private GitHub repositories, for a GitHub organization like [usnistgov](https://github.com/usnistgov/), must opt into this as a premium service; NIST's system owners for the usnistgov GitHub organization have opted not to do so at this time.)

### Software Composition Analysis and Vulnerability Analysis

To follow best practices generally and NIST requirements specifically, the developers automate analysis and reporting of third-party software usage, particularly the application's use of free and open-source licensed Javascript/Typescript libraries. Reporting is completed in machine-readable format for [Software Bill of Materials, a.k.a. SBOMS](https://ntia.gov/SBOM): [CycloneDX](https://cyclonedx.org/) and [SPDX](https://spdx.dev/).

With every change to application's dependency [manifest](./OSCAL-CAT-App/package.json) or [manfiest lockfile](./OSCAL-CAT-App/package-lock.json), the GitHub Actions workflows for continuous integration [upload complete Software Bill of Materials (SBOM) reports](https://github.com/usnistgov/oscal-cat/actions/workflows/generate-license-reports.yml) for any developer or community stakeholder to review.

Additionally, the developers of this application use [GitHub's Dependabot service](https://docs.github.com/en/code-security/dependabot/dependabot-security-updates/about-dependabot-security-updates) to perform software composition analysis, specifically for the application's dependencies declared in the [package manifest](./OSCAL-CAT-App/package.json) and its respective [manifest lockfile](./OSCAL-CAT-App/package-lock.json). This analysis confirms the currently configured versions of dependencies and will provide timely code changes to update libraries for either security fixes or feature enhancements (as documented in each change change request).

Developers configure the target language ecosystems in use for application development and a consistent scanning schedule in the service's [`dependabot.yml` configuration file](./.github/dependabot.yml).

During the Dependabot scan, the versioned dependencies from these language ecosystems become inputs to vulnerability analysis. The service uses a variety of important sources for vulnerability information: [the National Vulnerabilit Database's CVE Program](https://nvd.nist.gov/vuln) and [GitHub's Advisory Database for additional information](https://github.blog/2022-04-14-dependabot-alerts-now-surface-if-code-is-calling-vulnerability/#which-advisories-and-ecosystems-are-supported).

In the case of security fixes, developers receive notifications and/or automated code modifications to update dependencies to versions with the vulnerability mitigated. Developers will periodically review the vulnerabilities and merge in the code modifications during the development lifecycle.

In execeptional cases, some dependencies may pose a manageable risk, which can be accepted and/or mitigated without upgrading or removing the dependency (if a notification indicates an obselete dependency with no future upgrades). Additionally, other dependencies will be false positives. The developers will document certain accepted or mitigated risks from particular vulnerabilities, as appropriate, to inform potential customers using deploying the application as a system component or system in their own environments.

## NIST IT and Security Controls Conformance

### SA-11: Developer Security Testing And Evaluation

#### Control

[link](https://github.com/usnistgov/oscal-content/blob/159073e8a8ca16b3f8fba695aa00018f12535719/nist.gov/SP800-53/rev5/xml/NIST_SP-800-53_rev5_catalog.xml#L57689)

#### Parameters

- Perform:
  - unit testing/evaluation
  - integration testing/evaluation
  - at basic coverage and depth iteratively as part of code review amongst developers

#### Implementation Status

Partial

#### Control Origination

Shared

#### Responsible Roles

- OSCAL CAT Project Leads
- OSCAL CAT Developers

#### Implemented Requirement Statements

##### SA-11.a

This project is a reference implementation of an OSCAL profile authoring application. It is not a self-sufficient system component or complete, self-contained system. Therefore, there is no plan for ongoing and comprehensive security and privacy control assessment but documented controls in the project's testing plan. Controls documented in this testing plan represent the standard practice implemented in developer environments. The implemented requirement statements and supporting evidence are provided however for customers as part of their responsibility to implement and document the application as part of their own system or system component.

##### SA-11.b

This application implements basic unit and integration testing as documented in the testing plan re [unit testing](#unit-testing) and [integration testing](#integration-testing) implementation.

##### SA-11.c

This project is a reference implementation of an OSCAL profile authoring application. It is not a self-sufficient system component or complete, self-contained system. Therefore, the development team does not develop or maintain a complete, comprehensive assessment plan, as is the goal of this control statement. Controls documented in this testing plan represent the standard practice implemented in developer environments. The implemented requirement statements and supporting evidence are provided however for customers as part of their responsibility to implement and document the application as part of their own system or system component.

##### SA-11.d

The project developers implement a flaw and remediation as part of their routine agile software development processes.

##### SA-11.e

Project developers correct flaws identified during testing and evaluation. The project's version control system's list of completed issues has [examples](https://github.com/usnistgov/oscal-cat/issues/14).

### SA-11(02): Threat and Vulnerability Analyses

#### Control

[link](https://github.com/usnistgov/oscal-content/blob/159073e8a8ca16b3f8fba695aa00018f12535719/nist.gov/SP800-53/rev5/xml/NIST_SP-800-53_rev5_catalog.xml#L)

#### Parameters

- Uses the following contextual information:
    - NIST OISM's information concerning impact, environment of operations, known or assumed threats, and acceptable risk levels];
- Employs the following tools and methods:
    - Software composition analysis tools
    - Vulnerability analysis tools
- Conducts the modeling and analyses at the following level of rigor:
    - None, no threat modeling is required or conducted
- Produces evidence that meets the following acceptance criteria:
    - During [code review](#manual-code-review) through review of outputs from developers executing tools locally

#### Implementation Status

Partial

#### Control Origination

Shared

#### Responsible Roles

- OSCAL CAT Project Leads
- OSCAL CAT Developers

#### Implemented Requirement Statements

Project developers routinely [complete vulnerability analysis](#software-composition-analysis-and-vulnerability-analysis).

This project is a reference implementation of an OSCAL profile authoring application. It is not a self-sufficient system component or complete, self-contained system. Therefore, comprehensive threat analysis is not peformed on the application and its source code. Such threat analysis is highly contextual and dependent on the system component or system in which a customer deploys this application.

### SA-11(04): Manual Code Reviews

#### Control

[link](https://github.com/usnistgov/oscal-content/blob/159073e8a8ca16b3f8fba695aa00018f12535719/nist.gov/SP800-53/rev5/xml/NIST_SP-800-53_rev5_catalog.xml#L)

#### Parameters

N/A

#### Implementation Status

Partial

#### Control Origination

Shared

#### Responsible Roles

- OSCAL CAT Developers

#### Implemented Requirement Statements

Project developers are required to perform a manual code review of all code change requests, from fellow developers or automated code analysis tools, using [as part of their documented processes](#manual-code-review).

Organizationally defined members are required to provide a review before a pull request can be merged, as defined in the [`CODEOWNERS`](./.github/CODEOWNERS) file;

### SR-4: Provenance

#### Control

[link](https://github.com/usnistgov/oscal-content/blob/159073e8a8ca16b3f8fba695aa00018f12535719/nist.gov/SP800-53/rev5/xml/NIST_SP-800-53_rev5_catalog.xml#80202)

#### Parameters

- NIST OISM defined data requirements:
 - all systems or system components, including research software for publication
 - reports on all third-party software used by all systems or system components, including research software for publication
 - reports on all third-party software's licensing

#### Implementation Status

Partial

#### Control Origination

Shared

#### Responsible Roles

- OSCAL CAT Developers

#### Implemented Requirement Statements

The OSCAL CAT developers manage and monitor its usage of third party dependencies through [multiple software composition analysis techniques documented above](#software-composition-analysis-and-vulnerability-analysis).
