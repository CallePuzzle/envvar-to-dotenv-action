jest.mock('@actions/core');

import * as fs from "fs";
import {main} from "../src/main";

describe('Action run', () => {
    const envPath = __dirname + '/.env';

    let expectedFilePath: string;

    beforeEach(() => {
        if (fs.existsSync(envPath)) {
            fs.unlinkSync(envPath);
        }
    });

    afterEach(() => {
        const expected = fs.readFileSync(expectedFilePath);
        const actual = fs.readFileSync(envPath);

        expect(expected.equals(actual)).toBe(true);
    });

    it('should write variables to env', () => {
        expectedFilePath = __dirname + '/results/variable-name.env';

        main({
            variableName: 'SHELL',
            envPath: envPath,
        });
    });

    it('should write variables to env', () => {
        expectedFilePath = __dirname + '/results/variable-names.env';

        main({
            variableNames: 'SHELL,EDITOR',
            envPath: envPath,
        });
    });
});