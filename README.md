# File Uploader Web Application

This file uploader web application is a comprehensive demonstration of full-stack web development, seamlessly integrating both front-end and back-end components. The backend is powered by RESTful APIs to ensure efficient data handling and integration. The application also showcases full CRUD (Create, Read, Update, Delete) functionality, allowing users to manage uploaded files, as well as a search feature to quickly find specific records.

To further demonstrate modern development practices, the application is containerized using Docker, enabling easy deployment and distributed computing, making it scalable and versatile across various environments. This project serves as a clear example of a fully functional, containerized web application architecture.

### Technology Stack

- ![SvelteKit](https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=svelte&logoColor=white) SvelteKit
- ![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white) NestJS
- ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-336791?style=for-the-badge&logo=postgresql&logoColor=white) PostgreSQL
- ![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white) Docker

### Installation

You can install and run the web application just by using the docker command (assuming you have docker installed).

```
docker-compose up --build
```

### Frontend

The frontend is built using SvelteKit, a component-based framework designed for efficient and reactive web development. Dynamic routing is utilized for the update page, allowing updates to be made based on an item's unique id, which serves as the primary key. This ensures precise identification and modification of specific items within the application.

Server-side rendering (SSR) is employed to generate and pre-render table items, improving both performance and SEO by delivering content directly from the server. The update page also benefits from SSR, ensuring the latest data is served when modifying specific entries.

For the user interface, the application incorporates ShadCN UI components alongside TailwindCSS, providing a clean, responsive, and easily customizable design, making the application visually appealing and efficient to develop.

### Backend

The backend is developed using the NestJS framework, known for its scalability and modular architecture, making it ideal for building efficient and maintainable server-side applications.

- **Fastify:** The application leverages Fastify as its underlying HTTP server, offering exceptional performance and low overhead, ensuring fast request-response cycles and improved scalability.

- **TypeORM:** For database interactions, TypeORM is utilized, providing a robust and flexible ORM that simplifies the process of connecting and querying the database, while also supporting migrations and easy-to-manage entities.

- **DTO (Data Transfer Object):** DTOs are employed to define the shape of data that flows between the client and server, enforcing strict data validation and ensuring consistency in the API layer. This approach helps in preventing unnecessary data exposure and improves overall application security.

This combination of technologies enables the backend to be highly performant, secure, and maintainable.

### Postgres

PostgreSQL is used as the relational database in this web application because it makes storing and managing structured data straightforward and efficient. It is known for its strong support for SQL standards, allowing for easy handling of relationships between tables through features like primary keys and foreign keys. This makes it ideal for applications like this one, where data is structured and needs to be organized logically.

### Docker

Docker is used in this web application to simplify deployment, enhance consistency across different environments, and streamline the development process. By containerizing the application, Docker ensures that the same environment—down to the operating system, libraries, and dependencies—is used, whether on a developer’s machine, in staging, or in production. This eliminates the "it works on my machine" problem and reduces potential conflicts caused by differing setups.

> [!NOTE]
> For SvelteKit, .env is git ignored by default but to showcase the project we did not git ignore it.
