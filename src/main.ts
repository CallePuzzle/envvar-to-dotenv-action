import * as core from '@actions/core'
import {writeVariableName} from './writeVariableName'
import {writeVariableNames} from './writeVariableNames'
import {writeVariableNamesByFilter} from './writeVariableNamesByFilter'

interface Input {
    variableName?: string
    variableNames?: string
    variableNamesByFilter?: string
    envPath: string
}

export const main = (input: Input): void => {
    if (input.variableName !== undefined) {
        writeVariableName({
            variableName: input.variableName,
            envPath: input.envPath
        })
    }
    if (input.variableNames !== undefined) {
        writeVariableNames({
            variableNames: input.variableNames,
            envPath: input.envPath
        })
    }
    if (input.variableNamesByFilter !== undefined) {
        writeVariableNamesByFilter({
            variableNamesByFilter: input.variableNamesByFilter,
            envPath: input.envPath
        })
    }
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
