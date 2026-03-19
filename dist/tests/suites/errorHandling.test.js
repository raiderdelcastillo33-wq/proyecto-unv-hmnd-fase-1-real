"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlingTests = errorHandlingTests;
const ApplicationContainer_1 = require("../../src/app/ApplicationContainer");
const apiAssertions_1 = require("../helpers/apiAssertions");
function errorHandlingTests() {
    return [
        {
            name: 'Errores: body invalido y metodo invalido',
            run: async () => {
                const app = new ApplicationContainer_1.ApplicationContainer();
                const invalidBody = (await app.apiV1Router.handle('/api/v1/users/register', 'not-an-object'));
                (0, apiAssertions_1.ensureFailure)(invalidBody, 'VALIDATION_ERROR');
                const invalidMethod = (await app.apiV1Router.handle('/api/v1/catalog/list', {}, 'POST'));
                (0, apiAssertions_1.ensureFailure)(invalidMethod, 'VALIDATION_ERROR');
            }
        },
        {
            name: 'Errores: ruta inexistente devuelve NOT_FOUND',
            run: async () => {
                const app = new ApplicationContainer_1.ApplicationContainer();
                const notFound = (await app.apiV1Router.handle('/api/v1/does-not-exist', {}));
                if (notFound.success) {
                    throw new Error('Expected failure for unknown route');
                }
                if (notFound.error?.code !== 'NOT_FOUND') {
                    throw new Error(`Expected NOT_FOUND, got ${notFound.error?.code}`);
                }
            }
        },
        {
            name: 'Errores: validacion de prompt corto en AI',
            run: async () => {
                const app = new ApplicationContainer_1.ApplicationContainer();
                const user = (await app.apiV1Router.handle('/api/v1/users/register', {
                    email: 'errors@example.com',
                    displayName: 'Errors User',
                    level: 'beginner',
                    goals: ['aprender']
                }));
                if (!user.success) {
                    throw new Error('Unable to prepare user for AI test');
                }
                const shortPrompt = (await app.apiV1Router.handle('/api/v1/ai/ask', {
                    userId: user.data.id,
                    feature: 'assistant',
                    prompt: 'hey'
                }));
                (0, apiAssertions_1.ensureFailure)(shortPrompt, 'VALIDATION_ERROR');
            }
        },
        {
            name: 'Errores: slug invalido y duracion invalida en leccion',
            run: async () => {
                const app = new ApplicationContainer_1.ApplicationContainer();
                const course = (await app.apiV1Router.handle('/api/v1/courses/create', {
                    slug: 'errores-curso',
                    title: 'Errores Curso',
                    description: 'Descripcion valida para pruebas de errores de leccion.',
                    level: 'beginner'
                }));
                if (!course.success) {
                    throw new Error('Unable to prepare course for lesson validation');
                }
                const moduleData = (await app.apiV1Router.handle('/api/v1/modules/create', {
                    courseId: course.data.id,
                    title: 'Modulo Errores',
                    position: 1
                }));
                if (!moduleData.success) {
                    throw new Error('Unable to prepare module for lesson validation');
                }
                const invalidSlug = (await app.apiV1Router.handle('/api/v1/lessons/create', {
                    moduleId: moduleData.data.id,
                    slug: 'Slug Invalido',
                    title: 'Leccion con slug malo',
                    objective: 'Objetivo suficientemente largo',
                    durationMinutes: 20,
                    type: 'tutorial',
                    content: 'Contenido suficientemente largo para pasar otras validaciones.'
                }));
                (0, apiAssertions_1.ensureFailure)(invalidSlug, 'VALIDATION_ERROR');
                const invalidDuration = (await app.apiV1Router.handle('/api/v1/lessons/create', {
                    moduleId: moduleData.data.id,
                    slug: 'slug-valido',
                    title: 'Leccion duracion mala',
                    objective: 'Objetivo suficientemente largo',
                    durationMinutes: 0,
                    type: 'tutorial',
                    content: 'Contenido suficientemente largo para pasar otras validaciones.'
                }));
                (0, apiAssertions_1.ensureFailure)(invalidDuration, 'VALIDATION_ERROR');
            }
        }
    ];
}
//# sourceMappingURL=errorHandling.test.js.map