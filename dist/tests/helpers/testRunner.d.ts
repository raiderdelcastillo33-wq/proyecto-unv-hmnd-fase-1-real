export type AsyncTest = () => Promise<void>;
export interface TestCase {
    name: string;
    run: AsyncTest;
}
export declare function runTestCases(cases: TestCase[]): Promise<void>;
//# sourceMappingURL=testRunner.d.ts.map