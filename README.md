# PERSONAL ASSETS MANAGEMENT APP

Project description

---

#### For Windows users:

- WSL is mandatory for running this project.

- Project is to be cloned to WSL disk.
  If you're seeing `/mnt/` path prefix in your terminal it means the project **isn't** on the WSL disk.
  **This is required for hot reloading with docker**.

---

#### 0.1. What's shipped with this boilerplate?

- React (CRA) + NestJS applications
- Configured sequelize for PostgreSQL
- Tailwind
- React Redux
- React Router
- docker-compose

#### 0.2. Reference

- [Backend folder structure](./docs/backend.md)
- [Frontend folder structure](./docs/frontend.md)
- shared is a directory where common code is located in order to avoid duplication.
  It's symlinked into backend and frontend during project initiazation.

---

#### 1. Project init

- Run `npm run symlink-shared` after git clone.

---

#### 2. Bootstrap project using Docker Compose

- To build (rebuild) `docker-compose --env-file=.env.dev up -d --build`
- To start without building `docker-compose --env-file=.env.dev up -d`
- To stop `docker-compose --env-file=.env.dev down`
