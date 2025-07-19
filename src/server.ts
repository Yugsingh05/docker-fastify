import Fastify from 'fastify';
import type { FastifyInstance } from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

// Create a Fastify instance
const server: FastifyInstance = Fastify({ logger: true });

// Register plugins
server.register(fastifyCors, {
  origin: '*', // Allow all origins with credentials
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
});

// Register Swagger (OpenAPI spec generation)
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Fastify API with Drizzle',
      description: 'API documentation',
      version: '1.0.0',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: 'Local development server',
      },
    ],
    tags: [
      { name: 'users', description: 'User related end-points' },
      { name: 'tasks', description: 'Task related end-points' },
    ],
    components: {
      securitySchemes: {
        apiKey: {
          type: 'apiKey',
          name: 'apiKey',
          in: 'header',
        },
      },
    },
  },
  exposeHeadRoutes: true,
});

// Register Swagger UI
server.register(fastifySwaggerUi, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
    tryItOutEnabled: true,
  },
  staticCSP: false, // Disable Content-Security-Policy for development
  transformSpecification: (swaggerObject) => {
    return swaggerObject;
  },
  transformSpecificationClone: true,
});

// Register routes
server.register(userRoutes, { prefix: '/api' });
server.register(taskRoutes, { prefix: '/api' });

// Health check route
server.get('/health', async () => {
  return { status: 'ok', timestamp: new Date() };
});

// Root route
server.get('/', async () => {
  return { message: 'Welcome to Fastify API with Drizzle' };
});

// Run the server
const start = async () => {
  try {
    const PORT = process.env.PORT || 3000;
    await server.listen({ port: Number(PORT), host: '0.0.0.0' });
    server.log.info(`Server listening on port ${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
