import { runTestCases } from './helpers/testRunner'
import { edgeCaseTests } from './suites/edgeCases.test'
import { errorHandlingTests } from './suites/errorHandling.test'
import { frontendBasicTests } from './suites/frontendBasics.test'
import { happyPathTests } from './suites/happyPath.test'
import { mockTests } from './suites/mocks.test'

async function main(): Promise<void> {
  const allTests = [
    ...happyPathTests(),
    ...edgeCaseTests(),
    ...errorHandlingTests(),
    ...mockTests(),
    ...frontendBasicTests()
  ]

  await runTestCases(allTests)
}

main().catch((error: unknown) => {
  if (error instanceof Error) {
    console.error(error.stack ?? error.message)
    process.exit(1)
    return
  }

  console.error('Unknown test runner error')
  process.exit(1)
})
