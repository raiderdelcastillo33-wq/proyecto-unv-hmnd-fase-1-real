"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runTestCases = runTestCases;
async function runTestCases(cases) {
    let passed = 0;
    for (const testCase of cases) {
        try {
            await testCase.run();
            passed += 1;
            console.log(`PASS: ${testCase.name}`);
        }
        catch (error) {
            console.error(`FAIL: ${testCase.name}`);
            throw error;
        }
    }
    console.log(`\n${passed}/${cases.length} tests passed`);
}
//# sourceMappingURL=testRunner.js.map