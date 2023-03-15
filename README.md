# OSCAL Content/Catalog Authoring Tool (OSCAL CAT)

## The code in this repository (and the related website, if it exists) is no longer under active development. At this time, the NIST OSCAL Team does not maintain the code or update dependencies. We do not review issues for feature requests or bug fixes. The repository is archived: it can be reactivated, but can be deleted at any time.

## If you are interested in reactivation of this repository, feature requests, or bug fixes - please, let us know and we may consider reactivating this repository again prioritizing it with consideration to the available resources.

## Prerequisites:

### Required:

- `node`
- `angular`
- `ionic-angular`

### Helpful tools (Optional):

- Node package management `npm` or `yarn`
- Node version management `nvm`
- To manage and lint the code changes `VisualCode`

## After cloning the repository:

1. To develop and build locally, you **must** clone and check out all git submodules recursively.

```sh
git clone https://github.com/usnistgov/oscal-cat.git path/to/oscal-cat
cd path/to/oscal-cat
git submodule update --init --recursive
```

2. From the root directory of the project change the root directory of the project to the App directory:

```sh
cd OSCAL-CAT-App
```

3. To install and configure necessary node packages run (needed only the first time):

```sh
npm ci
npm run build
```

## To start application in the browser:

1. Change the root directory of the project to the App directory:

```
cd OSCAL-CAT-App
```

2. Launch the application

```
npm run start
```
