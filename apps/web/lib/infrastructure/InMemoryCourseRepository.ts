import { Course } from '../domain/entities/Course'
import { Lesson } from '../domain/entities/Lesson'
import { CourseModule } from '../domain/entities/Module'
import { CourseRepository } from '../domain/repositories/CourseRepository'

export class InMemoryCourseRepository implements CourseRepository {
  private courses: Course[] = [
    {
      id: 'course-1',
      slug: 'aprende-web-con-ia',
      title: 'Aprende Desarrollo Web con IA',
      description: 'Ruta completa para construir proyectos web con ayuda de IA.',
      level: 'beginner'
    }
  ]
  private modules: CourseModule[] = [
    {
      id: 'module-1',
      title: 'Fundamentos y Flujo de Trabajo',
      position: 1,
      courseId: 'course-1'
    }
  ]
  private lessons: Lesson[] = [
    {
      id: 'lesson-1',
      title: 'Crea tu Primer Proyecto con IA',
      objective: 'Construir una pagina inicial con estructura profesional.',
      moduleId: 'module-1'
    }
  ]

  async listPublishedCourses(): Promise<Course[]> {
    return this.courses
  }

  async listModulesByCourse(courseId: string): Promise<CourseModule[]> {
    return this.modules.filter(m => courseId === 'course-1')
  }

  async listLessonsByModule(moduleId: string): Promise<Lesson[]> {
    return this.lessons.filter(l => moduleId === 'module-1')
  }

  async listModulesByCourseBatch(courseIds: string[]): Promise<CourseModule[]> {
    return this.modules.filter(m => courseIds.includes('course-1'))
  }

  async listLessonsByModuleBatch(moduleIds: string[]): Promise<Lesson[]> {
    return this.lessons.filter(l => moduleIds.includes('module-1'))
  }
}