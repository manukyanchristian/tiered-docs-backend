# TieredDocs Backend

A modern, scalable backend API built with NestJS for the TieredDocs platform.

## 🚀 Features

- **NestJS Framework**: Built with the latest NestJS version for robust, scalable applications
- **Health Checks**: Built-in health monitoring endpoints
- **API Documentation**: Swagger/OpenAPI documentation
- **Environment Configuration**: Flexible environment variable management
- **Docker Support**: Containerized development and deployment
- **Validation**: Request validation with class-validator
- **CORS**: Cross-origin resource sharing enabled
- **TypeScript**: Full TypeScript support
- **Centralized Logging**: Winston-based logging with request/response logging and file rotation
- **Code Quality**: ESLint, Prettier, and Husky pre-commit hooks
- **Commit Standards**: Conventional commit message format enforcement

## 📋 Prerequisites

- Node.js (v20.11 or higher)
- npm (v8.0 or higher)
- Docker and Docker Compose (for containerized development)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 🚀 Running the Application

### Development Mode
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

### Docker Development
```bash
# Start all services (backend, PostgreSQL, Redis)
docker-compose up

# Start in background
docker-compose up -d

# Stop services
docker-compose down
```

## 📚 API Documentation

Once the application is running, you can access:

- **API Base URL**: `http://localhost:3000/api`
- **Swagger Documentation**: `http://localhost:3000/docs`
- **Health Check**: `http://localhost:3000/api/health`

## 🏥 Health Endpoints

- `GET /api/health` - Comprehensive health check
- `GET /api/health/ping` - Simple ping endpoint

## 🔧 Configuration

The application uses the following environment variables:

| Variable | Description | Default |
|----------|-------------|---------|
| `NODE_ENV` | Application environment | `development` |
| `PORT` | Server port | `3000` |
| `API_PREFIX` | API route prefix | `api` |
| `DATABASE_URL` | PostgreSQL connection string | - |
| `JWT_SECRET` | JWT signing secret | - |
| `REDIS_URL` | Redis connection string | - |

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 📦 Build

```bash
npm run build
```

## 🐳 Docker

### Production Build
```bash
docker build -t tiereddocs-backend .
docker run -p 3000:3000 tiereddocs-backend
```

### Development with Docker Compose
The `docker-compose.yml` includes:
- **Backend**: NestJS application with hot reload
- **PostgreSQL**: Database for development
- **Redis**: Cache and session storage

## 📁 Project Structure

```
src/
├── app.module.ts         # Root application module
├── health/               # Health check endpoints
│   └── health.controller.ts
├── logging/              # Centralized logging system
│   ├── logging.module.ts
│   ├── logging.interceptor.ts
│   ├── logger.service.ts
│   └── index.ts
└── main.ts              # Application entry point
```

## 🔍 Code Quality

- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **TypeScript**: Static type checking

## 📝 Logging

The application uses a centralized logging system with Winston:

- **Request Logging**: All HTTP requests and responses are automatically logged
- **File Logging**: Logs are saved to `logs/` directory with automatic rotation
- **Structured Logging**: Consistent log format with context and metadata
- **Sensitive Data Protection**: Automatic redaction of passwords, tokens, and sensitive headers

See [docs/logging.md](docs/logging.md) for detailed logging documentation.

## 📝 Available Scripts

- `npm run start` - Start the application
- `npm run start:dev` - Start in development mode with hot reload
- `npm run start:debug` - Start in debug mode
- `npm run start:prod` - Start in production mode
- `npm run build` - Build the application
- `npm run test` - Run unit tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:cov` - Run tests with coverage
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

## 📝 Commit Message Standards

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification for commit messages. All commit messages must follow this format:

```
<type>(<scope>): <description>
```

### Commit Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries
- **ci**: Changes to our CI configuration files and scripts
- **build**: Changes that affect the build system or external dependencies
- **revert**: Reverts a previous commit

### Examples

```bash
# Good commit messages
feat: add user authentication
fix(api): resolve timeout issue
docs: update README
style: format code with prettier
refactor(auth): simplify token validation
perf(db): optimize user queries
test: add unit tests for auth service
chore: update dependencies
ci: add GitHub Actions workflow
build: update webpack configuration
revert: revert "feat: add user authentication"

# Bad commit messages
update code
fix bug
changes
WIP
```

### Scope (Optional)

The scope should be the area of the codebase affected:
- `api` - API endpoints and controllers
- `auth` - Authentication and authorization
- `db` - Database related changes
- `config` - Configuration files
- `docs` - Documentation
- `test` - Testing related changes

**Note**: The commit message hook will automatically validate your commit messages and prevent commits that don't follow this format.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is proprietary software for TieredDocs.

## 🆘 Support

For support and questions, please contact the development team.
