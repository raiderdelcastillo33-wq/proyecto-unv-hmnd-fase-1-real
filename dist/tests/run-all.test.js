"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testRunner_1 = require("./helpers/testRunner");
const edgeCases_test_1 = require("./suites/edgeCases.test");
const errorHandling_test_1 = require("./suites/errorHandling.test");
const frontendBasics_test_1 = require("./suites/frontendBasics.test");
const happyPath_test_1 = require("./suites/happyPath.test");
const mocks_test_1 = require("./suites/mocks.test");
async function main() {
    const allTests = [
        ...(0, happyPath_test_1.happyPathTests)(),
        ...(0, edgeCases_test_1.edgeCaseTests)(),
        ...(0, errorHandling_test_1.errorHandlingTests)(),
        ...(0, mocks_test_1.mockTests)(),
        ...(0, frontendBasics_test_1.frontendBasicTests)()
    ];
    await (0, testRunner_1.runTestCases)(allTests);
}
main().catch((error) => {
    if (error instanceof Error) {
        console.error(error.stack ?? error.message);
        process.exit(1);
        return;
    }
    console.error('Unknown test runner error');
    process.exit(1);
});
//# sourceMappingURL=run-all.test.js.map