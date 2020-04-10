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
        expectedFilePath = __dirname + '/results/expected.env';

        main({
            variableName: 'SHELL',
            envPath: envPath,
        });
    });
});