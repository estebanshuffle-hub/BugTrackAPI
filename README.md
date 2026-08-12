# BugTrackAPI

Full-stack bug tracking application built with **ASP.NET Core**, **React**, **SQL Server**, **Entity Framework Core**, and **JWT Authentication**.

BugTrackAPI allows users to register, log in, create bugs, manage priorities and statuses, add comments, and monitor project issues from a modern dashboard.

---

## English

### Features

* User registration
* User login
* JWT authentication
* Protected routes
* Create bugs
* View all bugs
* View bug details
* Update bug status
* Delete bugs
* Add comments
* View users
* Bug priorities
* Bug statuses
* Dashboard statistics
* Responsive dark interface
* REST API with Swagger documentation

---

## Technologies

### Backend

* C#
* ASP.NET Core Web API
* .NET 8
* Entity Framework Core
* SQL Server
* JWT Authentication
* Swagger / OpenAPI

### Frontend

* React
* Vite
* JavaScript
* Axios
* React Router
* CSS

### Development Tools

* Visual Studio 2022
* Visual Studio Code
* SQL Server Management Studio
* Git
* GitHub
* PowerShell

---

## Project Structure

```text
BugTrack/
│
├── BugTrack.API/
│   │
│   ├── Controllers/
│   │   ├── AuthController.cs
│   │   ├── BugsController.cs
│   │   ├── CommentsController.cs
│   │   └── UsersController.cs
│   │
│   ├── Data/
│   │   └── AppDbContext.cs
│   │
│   ├── DTOs/
│   │   ├── AuthResponseDto.cs
│   │   ├── BugCreateDto.cs
│   │   ├── BugUpdateDto.cs
│   │   ├── CommentCreateDto.cs
│   │   ├── LoginDto.cs
│   │   └── RegisterDto.cs
│   │
│   ├── Interfaces/
│   │   ├── IAuthService.cs
│   │   └── IBugService.cs
│   │
│   ├── Models/
│   │   ├── Bug.cs
│   │   ├── Comment.cs
│   │   └── User.cs
│   │
│   ├── Services/
│   │   ├── AuthService.cs
│   │   └── BugService.cs
│   │
│   ├── Program.cs
│   └── appsettings.json
│
├── bugtrack-frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── BugCard.jsx
│   │   │   ├── Navbar.jsx
│   │   │   └── Sidebar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── BugDetails.jsx
│   │   │   ├── Bugs.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── styles/
│   │   │   ├── auth.css
│   │   │   ├── bugs.css
│   │   │   ├── dashboard.css
│   │   │   └── global.css
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── BugTrack.API.sln
```

---

## Database

BugTrackAPI uses **SQL Server** with Entity Framework Core.

Main tables:

* Users
* Bugs
* Comments
* EF Migrations History

Relationships:

* A user can create multiple bugs.
* A bug can contain multiple comments.
* A user can create multiple comments.
* Each comment belongs to one bug.

---

## API Endpoints

### Authentication

```text
POST /api/Auth/register
POST /api/Auth/login
```

### Bugs

```text
GET    /api/Bugs
GET    /api/Bugs/{id}
POST   /api/Bugs
PUT    /api/Bugs/{id}
DELETE /api/Bugs/{id}
```

### Comments

```text
GET    /api/bugs/{bugId}/comments
POST   /api/bugs/{bugId}/comments
DELETE /api/bugs/{bugId}/comments/{commentId}
```

### Users

```text
GET /api/Users
GET /api/Users/{id}
```

---

## Bug Priorities

Available priorities:

```text
Low
Medium
High
Critical
```

---

## Bug Statuses

Available statuses:

```text
Open
In Progress
Closed
```

---

## Authentication

BugTrackAPI uses **JWT authentication**.

When a user logs in successfully, the backend generates a JWT token.

The frontend stores the token and sends it in protected API requests:

```text
Authorization: Bearer YOUR_TOKEN
```

Protected operations include:

* Creating bugs
* Updating bugs
* Deleting bugs
* Creating comments
* Accessing users

---

## Backend Installation

### Requirements

* .NET 8 SDK
* SQL Server
* Visual Studio 2022 or another compatible IDE

Clone the repository:

```bash
git clone https://github.com/estebanshuffle-hub/BugTrackAPI.git
```

Enter the project:

```bash
cd BugTrackAPI
```

Restore dependencies:

```bash
dotnet restore
```

Configure the SQL Server connection string inside:

```text
BugTrack.API/appsettings.json
```

Example:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=BugTrackDB;User Id=YOUR_USER;Password=YOUR_PASSWORD;TrustServerCertificate=True;"
  }
}
```

Do not upload real database credentials to a public repository.

---

## Database Migration

Open the Package Manager Console in Visual Studio and run:

```powershell
Add-Migration InitialCreate
```

Then:

```powershell
Update-Database
```

This will create the BugTrack database and required tables.

---

## Run Backend

From Visual Studio 2022:

```text
Run BugTrack.API
```

Or using the terminal:

```bash
dotnet run --project BugTrack.API
```

Swagger will be available at an address similar to:

```text
https://localhost:xxxx/swagger
```

---

## Frontend Installation

Go to the frontend directory:

```bash
cd bugtrack-frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

The frontend will normally be available at:

```text
http://localhost:5173
```

---

## Frontend API Configuration

The backend URL is configured inside:

```text
src/services/api.js
```

Example:

```javascript
const api = axios.create({
  baseURL: "https://localhost:7183/api"
});
```

Change the port if your ASP.NET Core API uses another address.

---

## Application Workflow

```text
Register
   ↓
Login
   ↓
JWT Token
   ↓
Dashboard
   ↓
Create Bug
   ↓
Set Priority
   ↓
Change Status
   ↓
Add Comments
   ↓
Close Bug
```

---

## Screenshots

You can add screenshots of the project inside a folder such as:

```text
screenshots/
```

Example:

```markdown
![Login](screenshots/login.png)

![Dashboard](screenshots/dashboard.png)

![Bug Details](screenshots/bug-details.png)
```

Recommended screenshots:

* Login
* Register
* Dashboard
* Bug list
* Create bug
* Bug details
* Comments
* Swagger

---

## Security

This project uses:

* Password hashing
* JWT authentication
* Protected API endpoints
* SQL Server authentication
* DTO validation

For production environments:

* Store JWT secrets in environment variables.
* Store database credentials outside `appsettings.json`.
* Use HTTPS.
* Restrict CORS.
* Use stronger authorization policies.
* Do not commit secrets to GitHub.

---

## Future Improvements

Possible future features:

* Admin dashboard
* User roles
* Bug assignment
* Advanced filters
* Search system
* Pagination
* Email notifications
* Attachments
* Bug history
* Project management
* Teams
* Profile page
* Dark/light theme
* Deployment with Docker
* Automated tests

---

## Español

### Descripción

BugTrackAPI es una aplicación web full stack diseñada para registrar, administrar y dar seguimiento a errores o incidencias de software.

Permite registrar usuarios, iniciar sesión, crear bugs, establecer prioridades, cambiar estados, agregar comentarios y visualizar estadísticas desde un dashboard.

---

## Funciones

* Registro de usuarios
* Inicio de sesión
* Autenticación mediante JWT
* Rutas protegidas
* Creación de bugs
* Visualización de bugs
* Detalles de cada bug
* Actualización de estados
* Eliminación de bugs
* Comentarios
* Visualización de usuarios
* Prioridades
* Estados
* Dashboard
* Interfaz oscura
* API REST
* Documentación con Swagger

---

## Tecnologías

### Backend

* C#
* ASP.NET Core Web API
* .NET 8
* Entity Framework Core
* SQL Server
* JWT
* Swagger

### Frontend

* React
* Vite
* JavaScript
* Axios
* React Router
* CSS

---

## Flujo de la aplicación

```text
Registro
   ↓
Inicio de sesión
   ↓
Token JWT
   ↓
Dashboard
   ↓
Crear Bug
   ↓
Asignar prioridad
   ↓
Cambiar estado
   ↓
Agregar comentarios
   ↓
Cerrar Bug
```

---

## Instalación del Backend

Clonar el repositorio:

```bash
git clone https://github.com/estebanshuffle-hub/BugTrackAPI.git
```

Entrar al proyecto:

```bash
cd BugTrackAPI
```

Restaurar paquetes:

```bash
dotnet restore
```

Configurar la conexión de SQL Server en:

```text
BugTrack.API/appsettings.json
```

Ejemplo:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=TU_SERVIDOR;Database=BugTrackDB;User Id=TU_USUARIO;Password=TU_PASSWORD;TrustServerCertificate=True;"
  }
}
```

No se recomienda subir credenciales reales a GitHub.

---

## Crear la base de datos

En Visual Studio abre:

```text
Tools
→ NuGet Package Manager
→ Package Manager Console
```

Ejecuta:

```powershell
Add-Migration InitialCreate
```

Después:

```powershell
Update-Database
```

Esto creará las tablas necesarias.

---

## Ejecutar el Backend

Puedes iniciar el proyecto desde Visual Studio 2022.

También puedes ejecutar:

```bash
dotnet run --project BugTrack.API
```

Luego abre Swagger:

```text
https://localhost:xxxx/swagger
```

---

## Instalación del Frontend

Entrar al frontend:

```bash
cd bugtrack-frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar:

```bash
npm run dev
```

Abrir:

```text
http://localhost:5173
```

---

## Autor

**Jorge Cubillo**

Software Developer | QA Tester | Game Tester

GitHub:

```text
https://github.com/estebanshuffle-hub
```

---

## Repository

```text
https://github.com/estebanshuffle-hub/BugTrackAPI
```

---

## License

This project is intended for educational, portfolio, and software development practice purposes.
