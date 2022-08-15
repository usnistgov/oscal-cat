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

import { Command } from 'commander';
import { createWriteStream } from 'fs';
import { promises as fsPromises } from 'fs';
import * as process from 'process';
import { FetchingJSONSchemaStore, InputData, JSONSchemaInput, quicktype } from 'quicktype-core';

type RuntimeOptions = Record<string, unknown>;
type SchemaGenerationParameters = Parameters<typeof quicktype>[0]['rendererOptions'];

async function generateInterfaces(
    rendererLanguage: string,
    rendererOptions: SchemaGenerationParameters,
    typeName: string,
    schema: string,
) {
    const schemaInput = new JSONSchemaInput(new FetchingJSONSchemaStore());
    await schemaInput.addSource({ name: typeName, schema });
    const inputData = new InputData();
    inputData.addInput(schemaInput);
    return await quicktype({
        inputData,
        lang: rendererLanguage,
        rendererOptions,
    });
}

async function stat(path: string): Promise<boolean> {
    try {
        const stats = await fsPromises.stat(path);
        if (stats) return true;
        else return false;
    } catch (err) {
        return false;
    }
}

function writeLines(path: string, lines: string[]): Promise<boolean> {
    return new Promise((resolve, reject) => {
        const file = createWriteStream(path, { flags: 'a' });
        for (const line of lines) {
            file.write(line + '\n');
        }
        file.end();
        file.on('finish', () => {
            resolve(true);
        });
        file.on('error', reject);
    });
}

async function exec(options: RuntimeOptions) {
    const rawData = await fsPromises.readFile(options.inputSchema as string);
    const inputData = rawData.toString('utf-8');
    const languageType = options.languageType as string;
    const topLevel = options.topLevel as string;
    const rendererConfiguration: SchemaGenerationParameters = JSON.parse(options.rendererConfiguration as string);
    const languageOutputFile = options.languageOutputFile as string;
    const preambleFile = options.preambleFile as string;
    const { lines: interfaces } = await generateInterfaces(
        languageType,
        rendererConfiguration,
        topLevel,
        inputData,
    );

    let isExistingFile;

    isExistingFile = await stat(languageOutputFile);

    if (options.overwrite && isExistingFile) {
        await fsPromises.unlink(languageOutputFile);
    }
    if (!options.overwrite && isExistingFile) {
        throw new Error(`path '${languageOutputFile}' exists and no overwrite argument provided`);
    }

    isExistingFile = await stat(preambleFile);

    if (preambleFile && !isExistingFile) {
        throw new Error(`preamble header in '${preambleFile}' misconfigured so preamble can't be added`);
    }

    if (preambleFile && isExistingFile) {
        const rawPreamble = await fsPromises.readFile(preambleFile);
        const preambleLines = rawPreamble.toString('utf-8').split(/\r?\n/);
        await writeLines(languageOutputFile, preambleLines);
    }

    await writeLines(languageOutputFile, interfaces);
}

function parseOptions(): RuntimeOptions {
    const program = new Command()
        .version('0.0.1')
        .description('CLI tool to generate Typescript interfaces from JSONSchema schema')
        .usage('[options]')
        .option('-l --language-type <language>', 'language type for language output file', 'typescript')
        .option('-t --top-level <name>', 'the name of the top-level object in the resulting schema', 'Result')
        .option(
            '-i --input-schema <filename>',
            'input JSONSchema file to read from',
            '../OSCAL/json/schema/oscal_complete_schema.json',
        )
        .option(
            '-o --language-output-file <filename>',
            'output language file of <language> type',
            'src/app/interfaces/oscal-types/oscal-catalog.types.ts',
        )
        .option(
            '-c --renderer-configuration <configuration',
            'JSON string <configuration> represents optional Quicktype RendererOptions',
            '{ "nice-property-names": true }',
        )
        .option(
            '-p --preamble-file <filename>',
            'header preamble <filename> to save before language output file content',
            'meta/license_header.txt',
        )
        .option('--overwrite', 'overwrite existing language output file if already existing')
        .parse(process.argv);
    return program.opts() as RuntimeOptions;
}

const options = parseOptions();
exec(options);
