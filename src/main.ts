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
        core.info('variableName is not undefined: ' + input.variableName + ' ... writing');
        writeVariableName({
            variableName: input.variableName,
            envPath: input.envPath
        })
    }
    if (input.variableNames !== undefined) {
        core.info('variableNames is not undefined: ' + input.variableNames + ' ... writing');
        writeVariableNames({
            variableNames: input.variableNames,
            envPath: input.envPath
        })
    }
    if (input.variableNamesByFilter !== undefined) {
        core.info('variableNamesByFilter is not undefined: ' + input.variableNamesByFilter + ' ... writing');
        writeVariableNamesByFilter({
            variableNamesByFilter: input.variableNamesByFilter,
            envPath: input.envPath
        })
    }
};

try {
    main({
        variableName: (core.getInput('variableName') === '') ? undefined : core.getInput('variableName'),
        variableNames: (core.getInput('variableNames') === '') ? undefined : core.getInput('variableNames'),
        variableNamesByFilter: (core.getInput('variableNamesByFilter') === '') ? undefined : core.getInput('variableNamesByFilter'),
        envPath: core.getInput('envPath'),
    });
} catch (error) {
    core.setFailed(`Action failed with error ${error}`);
}
