"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.edgeCaseTests = edgeCaseTests;
const ApplicationContainer_1 = require("../../src/app/ApplicationContainer");
const apiAssertions_1 = require("../helpers/apiAssertions");
function edgeCaseTests() {
    return [
        {
            name: 'Edge: normaliza email y detecta duplicados por mayusculas/espacios',
            run: async () => {
                const app = new ApplicationContainer_1.ApplicationContainer();
                (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/users/register', {
                    email: '  EDGE@Example.com ',
                    displayName: 'Edge User',
                    level: 'beginner',
                    goals: ['goal']
                })));
                const duplicate = (await app.apiV1Router.handle('/api/v1/users/register', {
                    email: 'edge@example.com',
                    displayName: 'Otro nombre',
                    level: 'beginner',
                    goals: ['otra meta']
                }));
                (0, apiAssertions_1.ensureFailure)(duplicate, 'CONFLICT');
            }
        },
        {
            name: 'Edge: previene posicion duplicada de modulo y paso duplicado de leccion',
            run: async () => {
                const app = new ApplicationContainer_1.ApplicationContainer();
                const course = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/courses/create', {
                    slug: 'edge-course',
                    title: 'Edge Course',
                    description: 'Descripcion valida para edge cases de posicion.',
                    level: 'beginner'
                })));
                const moduleA = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/modules/create', {
                    courseId: course.id,
                    title: 'Modulo A',
                    position: 1
                })));
                const duplicateModule = (await app.apiV1Router.handle('/api/v1/modules/create', {
                    courseId: course.id,
                    title: 'Modulo B',
                    position: 1
                }));
                (0, apiAssertions_1.ensureFailure)(duplicateModule, 'CONFLICT');
                const lesson = (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/lessons/create', {
                    moduleId: moduleA.id,
                    slug: 'edge-lesson',
                    title: 'Leccion Edge',
                    objective: 'Objetivo suficientemente largo',
                    durationMinutes: 25,
                    type: 'project',
                    content: 'Contenido amplio para superar validacion y probar pasos duplicados.'
                })));
                (0, apiAssertions_1.ensureSuccess)((await app.apiV1Router.handle('/api/v1/lessons/steps/add', {
                    lessonId: lesson.id,
                    position: 1,
                    title: 'Paso 1',
                    instruction: 'Instruccion larga para pasar la validacion minima requerida.'
                })));
                const duplicateStep = (await app.apiV1Router.handle('/api/v1/lessons/steps/add', {
                    lessonId: lesson.id,
                    position: 1,
                    title: 'Paso repetido',
                    instruction: 'Otra instruccion larga para validar conflicto de posicion.'
                }));
                (0, apiAssertions_1.ensureFailure)(duplicateStep, 'CONFLICT');
            }
        }
    ];
}
//# sourceMappingURL=edgeCases.test.js.map