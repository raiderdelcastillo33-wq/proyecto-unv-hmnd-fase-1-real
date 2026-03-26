import { Course } from '../entities/Course'
import { Lesson } from '../entities/Lesson'
import { CourseModule } from '../entities/Module'

export interface CourseRepository {
  listPublishedCourses(): Promise<Course[]>
  listModulesByCourse(courseId: string): Promise<CourseModule[]>
  listLessonsByModule(moduleId: string): Promise<Lesson[]>
  listModulesByCourseBatch(courseIds: string[]): Promise<CourseModule[]>
  listLessonsByModuleBatch(moduleIds: string[]): Promise<Lesson[]>
}