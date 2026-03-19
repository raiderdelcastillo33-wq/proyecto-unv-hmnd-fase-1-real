<<<<<<< HEAD
# Proyecto-UNV-HMND-fase-1-REAL
=======
# UNV-HMND

<p align="center">
  <strong>Plataforma modular de aprendizaje con IA</strong><br />
  Backend por capas + API versionada + frontend moderno orientado a demo de producto
</p>

<p align="center">
  <img alt="Node.js" src="https://img.shields.io/badge/Node.js-18%2B-2f7d32?style=for-the-badge&logo=node.js&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.x-3178c6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-Frontend-646cff?style=for-the-badge&logo=vite&logoColor=white" />
  <img alt="Architecture" src="https://img.shields.io/badge/Architecture-Layered-111827?style=for-the-badge" />
  <img alt="Testing" src="https://img.shields.io/badge/Tests-16%2F16%20passing-0f9f6e?style=for-the-badge" />
</p>

## Overview

UNV-HMND es una base funcional para una plataforma de aprendizaje de programación asistida por IA.

El proyecto está diseñado para demostrar una dirección seria de producto:

- backend limpio y desacoplado
- frontend presentable y modular
- API HTTP versionada
- proveedor IA abstracto
- suite de tests para negocio y frontend básico

Actualmente usa persistencia `in-memory`, lo que permite iterar rápido sobre reglas de negocio y UX antes de introducir infraestructura real.

## Highlights

- Arquitectura por capas en backend: `domain`, `application`, `infrastructure`, `interfaces`.
- API simple bajo `/api/v1`.
- Frontend con `Vite` organizado por features.
- Dashboard web con:
  - estado del sistema
  - creación de usuario demo
  - catálogo de aprendizaje
  - consulta al asistente IA
- Tests de negocio, edge cases, mocks y utilidades frontend.

## Product Snapshot

La experiencia actual permite simular un flujo real de plataforma:

1. Verificar el estado del sistema.
2. Crear un usuario demo.
3. Cargar el catálogo de aprendizaje.
4. Consultar al asistente IA.

Esto convierte el proyecto en una base útil tanto para:

- evaluación técnica
- demo visual
- evolución progresiva a producto real

## Tech Stack

### Core

- `Node.js`
- `TypeScript`

### Development

- `ts-node`
- `Vite`
- `concurrently`

### Testing

- `assert` nativo de Node
- runner custom en TypeScript

## Architecture

### Backend

- `domain`
  Núcleo del negocio: entidades, contratos, value objects y reglas puras.

- `application`
  Casos de uso y DTOs que orquestan el dominio.

- `infrastructure`
  Adaptadores concretos: repositorios `in-memory`, logging y proveedor IA mock.

- `interfaces`
  Frontera HTTP: routing, contratos y controladores.

- `shared`
  Errores, tipos transversales y utilidades comunes.

### Frontend

El frontend está organizado para crecer sin framework pesado:

- `app/`
  bootstrap, estado, cliente API, utilidades y contratos internos

- `features/`
  módulos por feature: `shell`, `health`, `user`, `catalog`, `assistant`

Esto permite mantener separadas:

- la lógica de red
- el estado compartido
- el acceso al DOM
- el comportamiento visual por sección

## Repository Structure

```text
src/
  app/
    ApplicationContainer.ts
  application/
    dto/
    use-cases/
  domain/
    entities/
    repositories/
    services/
    value-objects/
  infrastructure/
    ai/
    in-memory/
    logging/
  interfaces/
    http/
      contracts/
      controllers/
      routing/
  shared/
    errors/
    types/
    utils/
  api/
    server.ts
  main.ts

frontend/
  app/
    api/
    state/
    ui/
    utils/
  features/
    assistant/
    catalog/
    health/
    shell/
    user/
  index.html
  main.ts
  styles.css

tests/
  helpers/
  suites/
  run-all.test.ts
```

## Quick Start

### Requirements

- `Node.js 18+`
- `npm 9+`

### Install

```bash
npm install
```

### Validate

```bash
npm run build
npm test
```

## Run Locally

### Console flow demo

Ejecuta un flujo end-to-end desde consola:

```bash
npm run start
```

### API only

```bash
npm run start:api
```

Servidor disponible en:

```text
http://127.0.0.1:3000
```

### Full development environment

Levanta API + frontend:

```bash
npm run dev
```

Si el navegador no se abre automáticamente, usa la URL que imprima Vite en consola.

## Available Scripts

- `npm run dev`
  Ejecuta API y frontend en paralelo.

- `npm run dev:api`
  Ejecuta la API en desarrollo.

- `npm run dev:web`
  Ejecuta el frontend con Vite.

- `npm run build`
  Compila TypeScript.

- `npm run start`
  Ejecuta la demo de negocio en consola.

- `npm run start:api`
  Inicia solo la API.

- `npm run preview`
  Previsualiza el build del frontend.

- `npm test`
  Ejecuta toda la suite de tests.

## Current API Surface

Endpoints usados actualmente por el frontend:

- `GET /health`
- `POST /api/v1/users/register`
- `GET /api/v1/catalog/list`
- `POST /api/v1/ai/ask`

## Example Request Flow

1. El servidor recibe una request HTTP.
2. `/health` responde directamente.
3. `/api/v1/*` se delega al `ApiV1Router`.
4. El router despacha al controlador adecuado.
5. El controlador ejecuta un caso de uso.
6. El caso de uso interactúa con contratos del dominio.
7. La respuesta vuelve como `ApiResponse`.

## Testing

La suite actual cubre:

- happy path completo
- edge cases
- manejo de errores
- mocks del proveedor IA
- tests básicos del frontend

### Ejecutar tests

```bash
npm test
```

## Why This Base Is Valuable

El proyecto ya incorpora varias decisiones correctas para escalar:

- versionado de API
- contratos desacoplados
- proveedor IA reemplazable
- composición centralizada
- frontend modular por features
- suite de tests verificable

Esto reduce el costo de evolucionar hacia:

- persistencia SQL
- autenticación
- observabilidad real
- documentación OpenAPI
- integración con proveedor IA real

## Roadmap

### Backend

- reemplazar `in-memory` por persistencia real
- añadir validación de esquemas
- incorporar autenticación/autorización
- formalizar contratos con OpenAPI
- añadir rate limiting y métricas

### Frontend

- ampliar cobertura de tests por feature
- dividir `styles.css` en capas
- mejorar estados de loading/skeleton
- reforzar accesibilidad y motion preferences
- persistir estado de sesión/UI

## Project Status

Base técnica funcional, demostrable y con estructura suficientemente limpia para evolucionar a una primera versión de producto.
>>>>>>> eb5bbaa (Fase 1 base del sistema de agentes IA)
