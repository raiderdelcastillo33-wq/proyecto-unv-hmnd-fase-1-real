import { ConsoleLogger } from '../infrastructure/logging/ConsoleLogger';
import { AIController } from '../interfaces/http/controllers/AIController';
import { CourseController } from '../interfaces/http/controllers/CourseController';
import { LearningRoomController } from '../interfaces/http/controllers/LearningRoomController';
import { ProgressController } from '../interfaces/http/controllers/ProgressController';
import { UserController } from '../interfaces/http/controllers/UserController';
import { ApiV1Router } from '../interfaces/http/routing/ApiV1Router';
export declare class ApplicationContainer {
    readonly logger: ConsoleLogger;
    private readonly userRepository;
    private readonly courseRepository;
    private readonly progressRepository;
    private readonly learningRoomRepository;
    private readonly resourceRepository;
    private readonly interactionRepository;
    private readonly aiProvider;
    private readonly registerUserUseCase;
    private readonly createCourseUseCase;
    private readonly createModuleUseCase;
    private readonly createLessonUseCase;
    private readonly completeLessonUseCase;
    private readonly createLearningPostUseCase;
    private readonly listLearningCatalogUseCase;
    private readonly askAIAssistantUseCase;
    private readonly addResourceUseCase;
    readonly userController: UserController;
    readonly courseController: CourseController;
    readonly learningRoomController: LearningRoomController;
    readonly progressController: ProgressController;
    readonly aiController: AIController;
    readonly apiV1Router: ApiV1Router;
    seedBaseResources(): Promise<void>;
}
//# sourceMappingURL=ApplicationContainer.d.ts.map