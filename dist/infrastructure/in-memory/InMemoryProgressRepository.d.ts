import { Progress } from '../../domain/entities/Progress';
import { ProgressRepository } from '../../domain/repositories/ProgressRepository';
export declare class InMemoryProgressRepository implements ProgressRepository {
    private progress;
    upsert(item: Progress): Promise<Progress>;
    findByUserAndLesson(userId: string, lessonId: string): Promise<Progress | null>;
    listByUser(userId: string): Promise<Progress[]>;
}
//# sourceMappingURL=InMemoryProgressRepository.d.ts.map