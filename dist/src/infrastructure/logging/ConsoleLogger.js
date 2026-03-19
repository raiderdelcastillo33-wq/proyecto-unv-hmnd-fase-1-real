"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConsoleLogger = void 0;
class ConsoleLogger {
    info(message, metadata) {
        console.log('[INFO]', message, metadata ?? {});
    }
    error(message, metadata) {
        console.error('[ERROR]', message, metadata ?? {});
    }
}
exports.ConsoleLogger = ConsoleLogger;
//# sourceMappingURL=ConsoleLogger.js.map