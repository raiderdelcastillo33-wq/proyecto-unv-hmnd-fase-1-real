import { Course } from '../../domain/entities/Course';
import { Lesson } from '../../domain/entities/Lesson';
import { LessonStep } from '../../domain/entities/LessonStep';
import { CourseModule } from '../../domain/entities/Module';
import { CourseRepository } from '../../domain/repositories/CourseRepository';
export declare class InMemoryCourseRepository implements CourseRepository {
    private readonly coursesById;
    private readonly courseIdBySlug;
    private readonly modulesById;
    private readonly moduleIdsByCourse;
    private readonly moduleIdByCoursePosition;
    private readonly lessonsById;
    private readonly lessonIdsByModule;
    private readonly lessonIdByModuleSlug;
    private readonly stepsById;
    private readonly stepIdsByLesson;
    private readonly stepIdByLessonPosition;
    createCourse(course: Course): Promise<Course>;
    createModule(module: CourseModule): Promise<CourseModule>;
    createLesson(lesson: Lesson): Promise<Lesson>;
    addLessonStep(step: LessonStep): Promise<LessonStep>;
    findCourseBySlug(slug: string): Promise<Course | null>;
    findCourseById(courseId: string): Promise<Course | null>;
    findModuleById(moduleId: string): Promise<CourseModule | null>;
    findModuleByCourseAndPosition(courseId: string, position: number): Promise<CourseModule | null>;
    findLessonById(lessonId: string): Promise<Lesson | null>;
    findLessonByModuleAndSlug(moduleId: string, slug: string): Promise<Lesson | null>;
    findStepByLessonAndPosition(lessonId: string, position: number): Promise<LessonStep | null>;
    listModulesByCourse(courseId: string): Promise<CourseModule[]>;
    listLessonsByModule(moduleId: string): Promise<Lesson[]>;
    listStepsByLesson(lessonId: string): Promise<LessonStep[]>;
    listPublishedCourses(): Promise<Course[]>;
}
//# sourceMappingURL=InMemoryCourseRepository.d.ts.map