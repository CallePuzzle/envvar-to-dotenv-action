import * as core from '@actions/core'
import * as fs from "fs";
import dotenv, { DotenvParseOutput } from "dotenv";

interface Input {
    variableName?: string
    variableNames?: string
    variableNamesByFilter?: string
    envPath: string
}

interface Variable {
    key: string
    value: string
    envPath: string
}

export const main = (input: Input): void => {
    if (input.variableName !== undefined) {
        const value = process.env[input.variableName];
        if (value !== undefined) {
            write({
                key: input.variableName,
                value: value,
                envPath: input.envPath
            });
        }
    }
};

export const write = (variable: Variable): void => {

    core.setSecret(variable.value);
    core.exportVariable(variable.key, variable.value);

    let content: DotenvParseOutput = {[variable.key]: variable.value};
    if (fs.existsSync(variable.envPath)) {
        content = {...dotenv.parse(fs.readFileSync(variable.envPath)), ...content};
    }

    const envVars = Object.entries(content)
        .map(([key, value]) => `${key}=${value}`)
        .join('\n');

    fs.writeFileSync(variable.envPath, envVars);
};


try {
    main({
        variableName: core.getInput('variableName'),
        variableNames: core.getInput('variableNames'),
        variableNamesByFilter: core.getInput('variableNamesByFilter'),
        envPath: core.getInput('envPath'),
    });
} catch (error) {
    core.setFailed(error);
}
