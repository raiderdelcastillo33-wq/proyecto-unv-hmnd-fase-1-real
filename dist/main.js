"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ApplicationContainer_1 = require("./app/ApplicationContainer");
function unwrap(response) {
    if (!response.success) {
        const error = response;
        throw new Error(`${error.error.code}: ${error.error.message}`);
    }
    return response.data;
}
async function main() {
    const app = new ApplicationContainer_1.ApplicationContainer();
    await app.seedBaseResources();
    const userResponse = (await app.apiV1Router.handle('/api/v1/users/register', {
        email: 'dreamer@example.com',
        displayName: 'El Sonador',
        level: 'beginner',
        goals: ['aprender con IA', 'conseguir empleo web']
    }));
    const user = unwrap(userResponse);
    const courseResponse = (await app.apiV1Router.handle('/api/v1/courses/create', {
        slug: 'aprende-web-con-ia',
        title: 'Aprende Desarrollo Web con IA',
        description: 'Ruta completa para construir proyectos web con ayuda de IA.',
        level: 'beginner'
    }));
    const course = unwrap(courseResponse);
    const moduleResponse = (await app.apiV1Router.handle('/api/v1/modules/create', {
        courseId: course.id,
        title: 'Fundamentos y Flujo de Trabajo',
        position: 1
    }));
    const moduleItem = unwrap(moduleResponse);
    const lessonResponse = (await app.apiV1Router.handle('/api/v1/lessons/create', {
        moduleId: moduleItem.id,
        slug: 'primer-proyecto-con-ia',
        title: 'Crea tu Primer Proyecto con IA',
        objective: 'Construir una pagina inicial con estructura profesional.',
        durationMinutes: 45,
        type: 'project',
        content: 'Define objetivo, divide tareas, genera primer boceto, refina arquitectura y valida resultados.'
    }));
    const lesson = unwrap(lessonResponse);
    await app.apiV1Router.handle('/api/v1/lessons/steps/add', {
        lessonId: lesson.id,
        position: 1,
        title: 'Define objetivo',
        instruction: 'Escribe alcance, usuario objetivo y resultado esperado del proyecto.'
    });
    await app.apiV1Router.handle('/api/v1/progress/complete', {
        userId: user.id,
        lessonId: lesson.id
    });
    await app.apiV1Router.handle('/api/v1/learning-room/posts/create', {
        userId: user.id,
        title: 'Como mejorar prompts para frontend',
        body: 'Compartan prompts que les ayuden a estructurar mejores componentes y estilos.'
    });
    const aiResponse = (await app.apiV1Router.handle('/api/v1/ai/ask', {
        userId: user.id,
        feature: 'assistant',
        prompt: 'Dame una estrategia para aprender React con IA en 30 dias'
    }));
    const ai = unwrap(aiResponse);
    const catalogResponse = (await app.apiV1Router.handle('/api/v1/catalog/list', {}));
    console.log('=== DEMO SISTEMA FASE CONSTRUCTOR ===');
    console.log('Usuario ID:', user.id);
    console.log('Leccion ID:', lesson.id);
    console.log('Respuesta IA:', ai.response);
    console.log('Catalogo:', JSON.stringify(catalogResponse, null, 2));
}
main().catch((error) => {
    if (error instanceof Error) {
        console.error('Fatal error:', error.message);
        process.exitCode = 1;
        return;
    }
    console.error('Fatal unknown error');
    process.exitCode = 1;
});
//# sourceMappingURL=main.js.map