jest.mock('@actions/core');

import * as fs from "fs";
import {main} from "../src/main";

describe('Action run', () => {
    const envPath = __dirname + '/.env';

    let expectedFilePath: string;

    process.env.KEY1 = 'VALUE1';
    process.env.KEY2 = 'VALUE2';


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

    it('test variable name key1', () => {
        expectedFilePath = __dirname + '/results/variable-name.env';

        main({
            variableName: 'KEY1',
            envPath: envPath,
        });
    });

    it('test variable names key1 and key2', () => {
        expectedFilePath = __dirname + '/results/variable-names.env';

        main({
            variableNames: 'KEY1,KEY2',
            envPath: envPath,
        });
    });

    it('test regex ^KEY', () => {
        expectedFilePath = __dirname + '/results/variable-names.env';

        main({
            variableNamesByFilter: '^KEY',
            envPath: envPath,
        });
    });
});
