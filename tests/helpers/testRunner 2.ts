export type AsyncTest = () => Promise<void>

export interface TestCase {
  name: string
  run: AsyncTest
}

export async function runTestCases(cases: TestCase[]): Promise<void> {
  let passed = 0

  for (const testCase of cases) {
    try {
      await testCase.run()
      passed += 1
      console.log(`PASS: ${testCase.name}`)
    } catch (error) {
      console.error(`FAIL: ${testCase.name}`)
      throw error
    }
  }

  console.log(`\n${passed}/${cases.length} tests passed`)
}
