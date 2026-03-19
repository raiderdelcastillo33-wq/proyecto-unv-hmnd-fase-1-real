import { Course } from '../../domain/entities/Course';
import { Lesson } from '../../domain/entities/Lesson';
import { CourseModule } from '../../domain/entities/Module';
import { Resource } from '../../domain/entities/Resource';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
import { ResourceRepository } from '../../domain/repositories/ResourceRepository';
export interface LearningCatalogItem {
    course: Course;
    modules: Array<{
        module: CourseModule;
        lessons: Lesson[];
    }>;
}
export interface LearningCatalog {
    items: LearningCatalogItem[];
    resources: Resource[];
}
export declare class ListLearningCatalogUseCase {
    private readonly courseRepository;
    private readonly resourceRepository;
    constructor(courseRepository: CourseRepository, resourceRepository: ResourceRepository);
    execute(): Promise<LearningCatalog>;
}
//# sourceMappingURL=ListLearningCatalogUseCase.d.ts.map