import type { ExecutionPlan } from '../../../src/domain/execution/ExecutionPlan'
import { ExecutionPlanningService } from '../../../src/application/execution/ExecutionPlanningService'

export function createControlledExecutionPlan(): ExecutionPlan {
  return new ExecutionPlanningService().generateExecutionPreview()
}
