# Configuración de Cotización – Fullstack

Pequeño módulo para configurar operaciones y márgenes por planta según distintos rangos de volumen.

Stack usado:

- Node.js + GraphQL
- Prisma
- React + Apollo Client
- SQLite

---

## Estructura

El repo está dividido en backend y frontend.

backend
├ prisma
│  ├ schema.prisma
│  └ seed.js
├ src
│  ├ config
│  │  └ prisma.js
│  ├ graphql
│  │  └ schema.graphql
│  ├ modules
│  │  └ operations
│  │     ├ operation.schema.graphql
│  │     ├ operation.resolver.js
│  │     ├ operation.service.js
│  │     └ operation.repository.js
│  └ server.js

frontend
├ src
│  ├ apollo
│  ├ components
│  ├ graphql
│  ├ pages
│  ├ App.jsx
│  └ main.jsx

Backend expone una API GraphQL y el frontend consume esa API para mostrar la configuración de operaciones.

---

## Cómo correr el proyecto

### Backend

cd backend
npm install
npm run db:migrate
npm run db:seed
npm run dev

Backend queda corriendo en:

http://localhost:4000/graphql

---

### Frontend

En otra terminal:

cd frontend
npm install
npm run dev

Frontend corre en:

http://localhost:5173

---

## Flujo

1. Prisma define el modelo de datos
2. El seed crea una planta por default y algunas operaciones de ejemplo (almacenaje y transporte)
3. GraphQL expone queries para obtener operaciones por planta
4. React consulta la API y muestra los rangos de volumen en una tabla
5. Si el margen es menor o igual a 5% se muestra como alerta
6. La UI permite Crear nuevas operaciones o editar las existentes persistiendo los cambios en db :) 

---

## Notas

Para simplificar el setup se usa SQLite y datos iniciales con seed
