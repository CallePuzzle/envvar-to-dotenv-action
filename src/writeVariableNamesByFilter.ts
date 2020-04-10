import {write} from './write'

interface InputNamesByFilter {
    variableNamesByFilter: string
    envPath: string
}

export const writeVariableNamesByFilter = (input: InputNamesByFilter): void => {
    for (let envVar in process.env) {
        const re = new RegExp(input.variableNamesByFilter);
        if (re.test(envVar)) {
            const value = process.env[envVar];

            // Regex has group
            const regex = re.exec(envVar);
            if (regex !== null && typeof regex[1] === "string") {
                envVar = regex[1];
            }

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
