"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.happyPathTests = happyPathTests;
const node_assert_1 = __importDefault(require("node:assert"));
const ApplicationContainer_1 = require("../../src/app/ApplicationContainer");
const apiAssertions_1 = require("../helpers/apiAssertions");
function happyPathTests() {
    return [
        {
            name: 'Happy path: flujo completo de usuario, contenido, progreso y catalogo',
            run: async () => {
                const app = new ApplicationContainer_1.ApplicationContainer();
                await app.seedBaseResources();
                const user = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/users/register', {
                    email: 'happy@example.com',
                    displayName: 'Happy User',
                    level: 'beginner',
                    goals: ['aprender rapido']
                })));
                const course = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/courses/create', {
                    slug: 'happy-path-course',
                    title: 'Happy Path Course',
                    description: 'Curso completo para validar el camino principal.',
                    level: 'beginner'
                })));
                const moduleData = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/modules/create', {
                    courseId: course.id,
                    title: 'Modulo Inicial',
                    position: 1
                })));
                const lesson = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/lessons/create', {
                    moduleId: moduleData.id,
                    slug: 'leccion-principal',
                    title: 'Leccion Principal',
                    objective: 'Entender flujo completo de aprendizaje.',
                    durationMinutes: 30,
                    type: 'tutorial',
                    content: 'Contenido suficientemente largo para pasar la validacion del sistema base.'
                })));
                (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/lessons/steps/add', {
                    lessonId: lesson.id,
                    position: 1,
                    title: 'Paso Inicial',
                    instruction: 'Define objetivos y revisa la estructura del proyecto.'
                })));
                (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/progress/complete', {
                    userId: user.id,
                    lessonId: lesson.id
                })));
                const ai = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/ai/ask', {
                    userId: user.id,
                    feature: 'assistant',
                    prompt: 'Dame un plan de estudio semanal'
                })));
                node_assert_1.default.ok(ai.response.length > 0);
                const catalog = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/catalog/list', {}, 'GET')));
                node_assert_1.default.ok(catalog.items.length >= 1);
                node_assert_1.default.ok(catalog.resources.length >= 2);
            }
        }
    ];
}
//# sourceMappingURL=happyPath.test.js.map