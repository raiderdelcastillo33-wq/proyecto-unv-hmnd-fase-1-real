"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_assert_1 = __importDefault(require("node:assert"));
const ApplicationContainer_1 = require("../src/app/ApplicationContainer");
function ensureSuccess(response) {
    node_assert_1.default.equal(response.success, true);
    return response.data;
}
async function run() {
    const app = new ApplicationContainer_1.ApplicationContainer();
    await app.seedBaseResources();
    const userResponse = (await app.apiV1Router.handle('/api/v1/users/register', {
        email: 'test@example.com',
        displayName: 'Test User',
        level: 'beginner',
        goals: ['dominar fundamentos']
    }));
    const user = ensureSuccess(userResponse);
    node_assert_1.default.ok(user.id);
    const aiResponse = (await app.apiV1Router.handle('/api/v1/ai/ask', {
        userId: user.id,
        feature: 'assistant',
        prompt: 'Como practico TypeScript cada dia?'
    }));
    const ai = ensureSuccess(aiResponse);
    node_assert_1.default.ok(ai.response.length > 0);
    const courseResponse = (await app.apiV1Router.handle('/api/v1/courses/create', {
        slug: 'curso-test',
        title: 'Curso Test',
        description: 'Curso para validar reglas de consistencia.',
        level: 'beginner'
    }));
    const course = ensureSuccess(courseResponse);
    const module1Response = (await app.apiV1Router.handle('/api/v1/modules/create', {
        courseId: course.id,
        title: 'Modulo Base',
        position: 1
    }));
    ensureSuccess(module1Response);
    const duplicateModulePosition = (await app.apiV1Router.handle('/api/v1/modules/create', {
        courseId: course.id,
        title: 'Modulo Duplicado',
        position: 1
    }));
    node_assert_1.default.equal(duplicateModulePosition.success, false);
    if (!duplicateModulePosition.success) {
        node_assert_1.default.equal(duplicateModulePosition.error.code, 'CONFLICT');
    }
    const invalidBodyResponse = (await app.apiV1Router.handle('/api/v1/users/register', 'invalid-body'));
    node_assert_1.default.equal(invalidBodyResponse.success, false);
    if (!invalidBodyResponse.success) {
        node_assert_1.default.equal(invalidBodyResponse.error.code, 'VALIDATION_ERROR');
    }
    const invalidCatalogMethod = (await app.apiV1Router.handle('/api/v1/catalog/list', {}, 'POST'));
    node_assert_1.default.equal(invalidCatalogMethod.success, false);
    if (!invalidCatalogMethod.success) {
        node_assert_1.default.equal(invalidCatalogMethod.error.code, 'VALIDATION_ERROR');
    }
    const notFoundRoute = (await app.apiV1Router.handle('/api/v1/unknown', {}));
    node_assert_1.default.equal(notFoundRoute.success, false);
    node_assert_1.default.equal(notFoundRoute.error?.code, 'NOT_FOUND');
}
run()
    .then(() => {
    console.log('Smoke test passed');
})
    .catch((error) => {
    if (error instanceof Error) {
        console.error(error.message);
        process.exit(1);
        return;
    }
    console.error('Unknown test failure');
    process.exit(1);
});
//# sourceMappingURL=smoke.test.js.map