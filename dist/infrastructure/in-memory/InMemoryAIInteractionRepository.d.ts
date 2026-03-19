import { AIInteraction } from '../../domain/entities/AIInteraction';
import { AIInteractionRepository } from '../../domain/repositories/AIInteractionRepository';
export declare class InMemoryAIInteractionRepository implements AIInteractionRepository {
    private interactions;
    create(interaction: AIInteraction): Promise<AIInteraction>;
    listByUser(userId: string): Promise<AIInteraction[]>;
}
//# sourceMappingURL=InMemoryAIInteractionRepository.d.ts.map