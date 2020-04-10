import * as core from '@actions/core'
import * as fs from "fs";
import dotenv, { DotenvParseOutput } from "dotenv";

interface Variable {
    key: string
    value: string
    envPath: string
}

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
