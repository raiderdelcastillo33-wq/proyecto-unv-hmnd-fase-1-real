import { LessonType } from '../../domain/value-objects/LessonType';
export interface CreateCourseInput {
    slug: string;
    title: string;
    description: string;
    level: 'beginner' | 'intermediate' | 'advanced';
}
export interface CreateModuleInput {
    courseId: string;
    title: string;
    position: number;
}
export interface CreateLessonInput {
    moduleId: string;
    slug: string;
    title: string;
    objective: string;
    durationMinutes: number;
    type: LessonType;
    content: string;
}
export interface AddLessonStepInput {
    lessonId: string;
    position: number;
    title: string;
    instruction: string;
}
//# sourceMappingURL=CourseDTO.d.ts.map