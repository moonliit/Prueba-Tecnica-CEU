# Catálogo de Talleres CEU

Aplicación web fullstack desarrollada como parte del **Reto Técnico – Practicante Fullstack (CEU)**.
El objetivo del proyecto es proporcionar una herramienta sencilla para **registrar, listar y administrar talleres tecnológicos** desde un panel administrativo.

El sistema está compuesto por:

- **Backend**: API REST construida con Django y Django REST Framework.
- **Frontend**: Single Page Application (SPA) desarrollada con React, Vite y Tailwind CSS.

---

## Descripción del Caso

CEU Centro de Especialización requiere una aplicación interna que permita al equipo de marketing:

- Registrar nuevos talleres tecnológicos.
- Visualizar los talleres existentes en un panel administrativo.
- Gestionar talleres de forma rápida y clara.

Esta aplicación cubre dichos requerimientos y añade mejoras orientadas a experiencia de usuario y calidad de código.

---

## Tecnologías Utilizadas

### Backend

- Python 3.13
- Django 6.0
- Django REST Framework
- Django CORS Headers
- SQLite (base de datos por defecto)
- uv (gestión de dependencias)

### Frontend

- Node.js 25
- React 19
- Vite
- TypeScript
- Tailwind CSS
- Axios
- ESLint

---

## Funcionalidades Implementadas

### Backend

- API REST para la entidad **Workshop (Taller)**:
  - `GET /api/talleres/` – Listar talleres.
  - `POST /api/talleres/` – Crear talleres.
  - `PUT /api/talleres/:id` – Actualizar talleres.
  - `PATCH /api/talleres/:id` – Actualizar parcialmente talleres.
  - `DELETE /api/talleres/:id` – Eliminar talleres.

- Modelo con los campos:
  - id
  - name: nombre
  - description: descripcion
  - start_date: fecha de inicio
  - category: categoria
  - created_at: fecha de creacion

- Serialización y validación de datos.
- Configuración de CORS para consumo desde el frontend.

### Frontend

- Visualización de talleres en formato de tarjetas.
- Formulario para creación de nuevos talleres.
- Edición de talleres existentes.
- Eliminación con confirmación.
- Filtro por categoría.
- Scroll y enfoque automático al crear o editar talleres.
- Estados de carga y manejo de errores.
- Animaciones y transiciones suaves para mejor UX.

---

## Estructura del Proyecto

```
.
├── backend
│   ├── config
│   ├── workshops
│   ├── db.sqlite3
│   ├── manage.py
│   └── pyproject.toml
├── frontend
│   ├── src
│   │   ├── api
│   │   ├── components
│   │   ├── hooks
│   │   ├── pages
│   │   └── types
│   ├── package.json
│   └── vite.config.ts
└── README.md
```

---

## Requisitos Previos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- Python **>= 3.13**
- Node.js **>= 18** (probado con Node 25)
- npm **>= 10**
- uv (opcional, recomendado para backend)

---

## Configuración por Variables de Entorno (Backend)

El backend utiliza variables de entorno para configurar ciertos parámetros de ejecución.
Estas variables deben definirse en un archivo `.env` ubicado en la carpeta `backend/`.

### Variables requeridas

| Variable   | Descripción                         | Ejemplo                   |
| ---------- | ----------------------------------- | ------------------------- |
| DEBUG      | Activa el modo desarrollo de Django | True                      |
| SECRET_KEY | Clave secreta utilizada por Django  | django-insecure-secretkey |

### Ejemplo de archivo `.env`

```env
DEBUG=True
SECRET_KEY=django-insecure-secretkey

```

---

## Instalación y Ejecución

Antes de ejecutar el servidor, asegúrate de haber creado el archivo `.env` con las variables indicadas en la sección anterior.

### Backend

1. Acceder a la carpeta del backend:

```bash
   cd backend
```

2. Instalar dependencias:

   ```bash
   uv sync
   ```

3. Aplicar migraciones:

   ```bash
   uv run python manage.py migrate
   ```

4. Ejecutar el servidor:

   ```bash
   uv run python manage.py runserver
   ```

El backend quedará disponible en:

```
http://localhost:8000
```

---

### Frontend

1. Acceder a la carpeta del frontend:

   ```bash
   cd frontend
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Ejecutar el servidor de desarrollo:

   ```bash
   npm run dev -- --host
   ```

El frontend quedará disponible en:

```
http://localhost:5173
```

---

## Configuración de la API

El frontend consume la API desde la siguiente configuración:

```ts
export const http = axios.create({
  baseURL: "http://localhost:8000/api",
});
```

No es necesario configurar variables de entorno en el frontend.
El backend sí admite variables de entorno mediante `.env` si se desea extender la configuración.

---

## Manejo de Git

El desarrollo se realizó utilizando commits incrementales y descriptivos, por ejemplo:

- Initial backend implementation (models, API, tests)
- Initial frontend implementation (CRUD, filtering)
- Improved frontend animations and confirm dialogs

---

## Puntos Pendientes / Mejoras Futuras

- Dockerización del proyecto (Dockerfile / docker-compose).
- Validaciones más estrictas en fechas pasadas.
- Tests automatizados adicionales.
- Despliegue en entorno productivo.
