import * as userController from '../controllers/userController.js';
// User route schemas
const getUserSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};
const createUserSchema = {
    body: {
        type: 'object',
        required: ['name', 'email', 'password'],
        properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            password: { type: 'string' }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        }
    }
};
const updateUserSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            email: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                email: { type: 'string' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};
const deleteUserSchema = {
    params: {
        type: 'object',
        required: ['id'],
        properties: {
            id: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        404: {
            type: 'object',
            properties: {
                error: { type: 'string' }
            }
        }
    }
};
export default function userRoutes(fastify, options, done) {
    // Get all users
    fastify.get('/users', userController.getAllUsers);
    // Get a user by ID
    fastify.get('/users/:id', { schema: getUserSchema }, userController.getUserById);
    // Create a new user
    fastify.post('/users', { schema: createUserSchema }, userController.createUser);
    // Update a user
    fastify.put('/users/:id', { schema: updateUserSchema }, userController.updateUser);
    // Delete a user
    fastify.delete('/users/:id', { schema: deleteUserSchema }, userController.deleteUser);
    done();
}
