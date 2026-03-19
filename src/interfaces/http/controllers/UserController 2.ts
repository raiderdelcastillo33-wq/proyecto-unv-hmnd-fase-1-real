import { RegisterUserInput } from '../../../application/dto/UserDTO'
import { RegisterUserUseCase } from '../../../application/use-cases/RegisterUserUseCase'
import { ApiResponse } from '../../../shared/types/ApiResponse'
import { handleController } from './ControllerHandler'

export class UserController {
  constructor(private readonly registerUserUseCase: RegisterUserUseCase) {}

  async register(input: RegisterUserInput): Promise<ApiResponse<{ id: string }>> {
    return handleController(async () => {
      const user = await this.registerUserUseCase.execute(input)
      return { id: user.id }
    })
  }
}
