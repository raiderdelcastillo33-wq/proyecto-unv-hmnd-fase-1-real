import { AskAssistantInput } from '../dto/AIDTO';
import { AIInteraction } from '../../domain/entities/AIInteraction';
import { AIInteractionRepository } from '../../domain/repositories/AIInteractionRepository';
import { UserRepository } from '../../domain/repositories/UserRepository';
import { AIProvider } from '../../domain/services/AIProvider';
export declare class AskAIAssistantUseCase {
    private readonly userRepository;
    private readonly aiProvider;
    private readonly interactionRepository;
    constructor(userRepository: UserRepository, aiProvider: AIProvider, interactionRepository: AIInteractionRepository);
    execute(input: AskAssistantInput): Promise<AIInteraction>;
}
//# sourceMappingURL=AskAIAssistantUseCase.d.ts.map