import { AskAssistantInput } from '../../../application/dto/AIDTO';
import { AskAIAssistantUseCase } from '../../../application/use-cases/AskAIAssistantUseCase';
import { ApiResponse } from '../../../shared/types/ApiResponse';
export declare class AIController {
    private readonly askAIAssistantUseCase;
    constructor(askAIAssistantUseCase: AskAIAssistantUseCase);
    ask(input: AskAssistantInput): Promise<ApiResponse<{
        id: string;
        response: string;
    }>>;
}
//# sourceMappingURL=AIController.d.ts.map