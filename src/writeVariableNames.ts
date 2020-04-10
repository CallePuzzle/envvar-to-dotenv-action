import {write} from './write'

interface InputNames {
    variableNames: string
    envPath: string
}

export const writeVariableNames = (input: InputNames): void => {
    for (const variableName of input.variableNames.split(',')) {
        const value = process.env[variableName];
        if (value !== undefined) {
            write({
                key: variableName,
                value: value,
                envPath: input.envPath
            });
        }
    }
};
