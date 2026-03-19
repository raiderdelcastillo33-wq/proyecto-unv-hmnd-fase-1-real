"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_http_1 = require("node:http");
const ApplicationContainer_1 = require("../app/ApplicationContainer");
const API_PORT = 3000;
const app = new ApplicationContainer_1.ApplicationContainer();
void app.seedBaseResources();
function setCorsHeaders(response) {
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}
function sendJson(response, statusCode, payload) {
    response.statusCode = statusCode;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.end(JSON.stringify(payload));
}
async function readBody(request) {
    const chunks = [];
    for await (const chunk of request) {
        chunks.push(Buffer.from(chunk));
    }
    if (chunks.length === 0) {
        return {};
    }
    const rawBody = Buffer.concat(chunks).toString('utf-8').trim();
    if (rawBody.length === 0) {
        return {};
    }
    return JSON.parse(rawBody);
}
const server = (0, node_http_1.createServer)(async (request, response) => {
    setCorsHeaders(response);
    if (!request.url || !request.method) {
        sendJson(response, 400, {
            success: false,
            error: {
                code: 'BAD_REQUEST',
                message: 'Invalid request'
            }
        });
        return;
    }
    if (request.method === 'OPTIONS') {
        response.statusCode = 204;
        response.end();
        return;
    }
    if (request.url === '/health' && request.method === 'GET') {
        sendJson(response, 200, {
            status: 'ok',
            service: 'api-server'
        });
        return;
    }
    if (request.url.startsWith('/api/v1/')) {
        try {
            const body = request.method === 'GET' ? {} : await readBody(request);
            const result = await app.apiV1Router.handle(request.url, body, request.method);
            sendJson(response, 200, result);
            return;
        }
        catch (error) {
            sendJson(response, 500, {
                success: false,
                error: {
                    code: 'INTERNAL_SERVER_ERROR',
                    message: error instanceof Error ? error.message : 'Unexpected server error'
                }
            });
            return;
        }
    }
    sendJson(response, 404, {
        success: false,
        error: {
            code: 'NOT_FOUND',
            message: 'Route not found'
        }
    });
});
server.listen(API_PORT, '127.0.0.1', () => {
    console.log(`API server ready at http://localhost:${API_PORT}`);
});
//# sourceMappingURL=server.js.map