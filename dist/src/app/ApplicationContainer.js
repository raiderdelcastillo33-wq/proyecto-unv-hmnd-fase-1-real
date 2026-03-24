"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationContainer = void 0;
const AskAIAssistantUseCase_1 = require("../application/use-cases/AskAIAssistantUseCase");
const AddResourceUseCase_1 = require("../application/use-cases/AddResourceUseCase");
const CompleteLessonUseCase_1 = require("../application/use-cases/CompleteLessonUseCase");
const CreateCourseUseCase_1 = require("../application/use-cases/CreateCourseUseCase");
const CreateLearningPostUseCase_1 = require("../application/use-cases/CreateLearningPostUseCase");
const CreateLessonUseCase_1 = require("../application/use-cases/CreateLessonUseCase");
const CreateModuleUseCase_1 = require("../application/use-cases/CreateModuleUseCase");
const ListLearningCatalogUseCase_1 = require("../application/use-cases/ListLearningCatalogUseCase");
const RegisterUserUseCase_1 = require("../application/use-cases/RegisterUserUseCase");
const MockAIProvider_1 = require("../infrastructure/ai/MockAIProvider");
const InMemoryAIInteractionRepository_1 = require("../infrastructure/in-memory/InMemoryAIInteractionRepository");
const InMemoryCourseRepository_1 = require("../infrastructure/in-memory/InMemoryCourseRepository");
const InMemoryLearningRoomRepository_1 = require("../infrastructure/in-memory/InMemoryLearningRoomRepository");
const InMemoryProgressRepository_1 = require("../infrastructure/in-memory/InMemoryProgressRepository");
const InMemoryResourceRepository_1 = require("../infrastructure/in-memory/InMemoryResourceRepository");
const InMemoryUserRepository_1 = require("../infrastructure/in-memory/InMemoryUserRepository");
const ConsoleLogger_1 = require("../infrastructure/logging/ConsoleLogger");
const AIController_1 = require("../interfaces/http/controllers/AIController");
const CourseController_1 = require("../interfaces/http/controllers/CourseController");
const LearningRoomController_1 = require("../interfaces/http/controllers/LearningRoomController");
const ProgressController_1 = require("../interfaces/http/controllers/ProgressController");
const UserController_1 = require("../interfaces/http/controllers/UserController");
const ApiV1Router_1 = require("../interfaces/http/routing/ApiV1Router");
const demoUser_1 = require("../shared/demoUser");
class ApplicationContainer {
    logger = new ConsoleLogger_1.ConsoleLogger();
    userRepository = new InMemoryUserRepository_1.InMemoryUserRepository();
    courseRepository = new InMemoryCourseRepository_1.InMemoryCourseRepository();
    progressRepository = new InMemoryProgressRepository_1.InMemoryProgressRepository();
    learningRoomRepository = new InMemoryLearningRoomRepository_1.InMemoryLearningRoomRepository();
    resourceRepository = new InMemoryResourceRepository_1.InMemoryResourceRepository();
    interactionRepository = new InMemoryAIInteractionRepository_1.InMemoryAIInteractionRepository();
    aiProvider = new MockAIProvider_1.MockAIProvider();
    registerUserUseCase = new RegisterUserUseCase_1.RegisterUserUseCase(this.userRepository);
    createCourseUseCase = new CreateCourseUseCase_1.CreateCourseUseCase(this.courseRepository);
    createModuleUseCase = new CreateModuleUseCase_1.CreateModuleUseCase(this.courseRepository);
    createLessonUseCase = new CreateLessonUseCase_1.CreateLessonUseCase(this.courseRepository);
    completeLessonUseCase = new CompleteLessonUseCase_1.CompleteLessonUseCase(this.userRepository, this.courseRepository, this.progressRepository);
    createLearningPostUseCase = new CreateLearningPostUseCase_1.CreateLearningPostUseCase(this.userRepository, this.learningRoomRepository);
    listLearningCatalogUseCase = new ListLearningCatalogUseCase_1.ListLearningCatalogUseCase(this.courseRepository, this.resourceRepository);
    askAIAssistantUseCase = new AskAIAssistantUseCase_1.AskAIAssistantUseCase(this.userRepository, this.aiProvider, this.interactionRepository);
    addResourceUseCase = new AddResourceUseCase_1.AddResourceUseCase(this.resourceRepository);
    userController = new UserController_1.UserController(this.registerUserUseCase);
    courseController = new CourseController_1.CourseController(this.createCourseUseCase, this.createModuleUseCase, this.createLessonUseCase, this.listLearningCatalogUseCase);
    learningRoomController = new LearningRoomController_1.LearningRoomController(this.createLearningPostUseCase);
    progressController = new ProgressController_1.ProgressController(this.completeLessonUseCase);
    aiController = new AIController_1.AIController(this.askAIAssistantUseCase);
    apiV1Router = new ApiV1Router_1.ApiV1Router(this.userController, this.courseController, this.learningRoomController, this.progressController, this.aiController);
    async seedBaseResources() {
        const existingDemoUser = await this.userRepository.findByEmail(demoUser_1.DEMO_USER.email);
        if (!existingDemoUser) {
            await this.userRepository.create({
                ...demoUser_1.DEMO_USER,
                goals: [...demoUser_1.DEMO_USER.goals]
            });
        }
        await this.addResourceUseCase.execute({
            title: 'Prompt Base para Debug',
            category: 'prompt',
            description: 'Plantilla rápida para detectar errores y proponer pasos de solución.',
            content: 'Actúa como senior dev. Analiza el error, causa raíz, parche mínimo, prueba rápida y refactor recomendado.'
        });
        await this.addResourceUseCase.execute({
            title: 'Snippet Fetch Seguro',
            category: 'snippet',
            description: 'Ejemplo de fetch con control explícito de errores.',
            content: 'try/catch + validación de status + retorno tipado.'
        });
    }
}
exports.ApplicationContainer = ApplicationContainer;
//# sourceMappingURL=ApplicationContainer.js.map