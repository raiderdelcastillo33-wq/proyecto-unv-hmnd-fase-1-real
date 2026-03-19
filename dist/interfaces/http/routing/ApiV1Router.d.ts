import { AIController } from '../controllers/AIController';
import { CourseController } from '../controllers/CourseController';
import { LearningRoomController } from '../controllers/LearningRoomController';
import { ProgressController } from '../controllers/ProgressController';
import { UserController } from '../controllers/UserController';
export declare class ApiV1Router {
    private readonly userController;
    private readonly courseController;
    private readonly learningRoomController;
    private readonly progressController;
    private readonly aiController;
    constructor(userController: UserController, courseController: CourseController, learningRoomController: LearningRoomController, progressController: ProgressController, aiController: AIController);
    handle(path: string, body: unknown): Promise<unknown>;
}
//# sourceMappingURL=ApiV1Router.d.ts.map