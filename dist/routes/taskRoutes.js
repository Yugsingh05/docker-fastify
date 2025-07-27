import * as taskController from '../controllers/taskController.js';
// Task route schemas
const getTaskSchema = {
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
                title: { type: 'string' },
                description: { type: 'string' },
                completed: { type: 'boolean' },
                user_id: { type: 'number' },
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
const getUserTasksSchema = {
    params: {
        type: 'object',
        required: ['userId'],
        properties: {
            userId: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'number' },
                    title: { type: 'string' },
                    description: { type: 'string' },
                    completed: { type: 'boolean' },
                    user_id: { type: 'number' },
                    created_at: { type: 'string' },
                    updated_at: { type: 'string' }
                }
            }
        }
    }
};
const createTaskSchema = {
    body: {
        type: 'object',
        required: ['title', 'user_id'],
        properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            completed: { type: 'boolean' },
            user_id: { type: 'number' }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                description: { type: 'string' },
                completed: { type: 'boolean' },
                user_id: { type: 'number' },
                created_at: { type: 'string' },
                updated_at: { type: 'string' }
            }
        }
    }
};
const updateTaskSchema = {
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
            title: { type: 'string' },
            description: { type: 'string' },
            completed: { type: 'boolean' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                id: { type: 'number' },
                title: { type: 'string' },
                description: { type: 'string' },
                completed: { type: 'boolean' },
                user_id: { type: 'number' },
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
const deleteTaskSchema = {
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
export default function taskRoutes(fastify, options, done) {
    // Get all tasks
    fastify.get('/tasks', taskController.getAllTasks);
    // Get a task by ID
    fastify.get('/tasks/:id', { schema: getTaskSchema }, taskController.getTaskById);
    // Get tasks by user ID
    fastify.get('/users/:userId/tasks', { schema: getUserTasksSchema }, taskController.getTasksByUserId);
    // Create a new task
    fastify.post('/tasks', { schema: createTaskSchema }, taskController.createTask);
    // Update a task
    fastify.put('/tasks/:id', { schema: updateTaskSchema }, taskController.updateTask);
    // Delete a task
    fastify.delete('/tasks/:id', { schema: deleteTaskSchema }, taskController.deleteTask);
    done();
}
