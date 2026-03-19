import { Course } from '../entities/Course';
import { CourseModule } from '../entities/Module';
import { Lesson } from '../entities/Lesson';
import { LessonStep } from '../entities/LessonStep';
export interface CourseRepository {
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
//# sourceMappingURL=CourseRepository.d.ts.map