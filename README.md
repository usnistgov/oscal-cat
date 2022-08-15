# OSCAL Content/Catalog Authoring Tool (OSCAL CAT)

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
