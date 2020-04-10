import {write} from './write'

interface InputName {
    variableName: string
    envPath: string
}

export const writeVariableName = (input: InputName): void => {
    const value = process.env[input.variableName];
    if (value !== undefined) {
        write({
            key: input.variableName,
            value: value,
            envPath: input.envPath
        });
    }
};
