import {write} from './write'

interface InputNamesByFilter {
    variableNamesByFilter: string
    envPath: string
}

export const writeVariableNamesByFilter = (input: InputNamesByFilter): void => {
    for (const envVar in process.env) {
        const re = new RegExp(input.variableNamesByFilter);
        if (re.test(envVar)) {
            const value = process.env[envVar];
            if (value !== undefined) {
                write({
                    key: envVar,
                    value: value,
                    envPath: input.envPath
                });
            }
        }
    }
};
