"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureSuccess = ensureSuccess;
exports.ensureFailure = ensureFailure;
const node_assert_1 = __importDefault(require("node:assert"));
function ensureSuccess(response) {
    node_assert_1.default.equal(response.success, true);
    return response.data;
}
function ensureFailure(response, code) {
    node_assert_1.default.equal(response.success, false);
    if (!response.success) {
        node_assert_1.default.equal(response.error.code, code);
    }
}
//# sourceMappingURL=apiAssertions.js.map