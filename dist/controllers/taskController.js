import { db } from '../db/index.js';
import { tasks } from '../db/schema.js';
import { desc, eq } from 'drizzle-orm';
// Get all tasks
export const getAllTasks = async (req, reply) => {
    try {
        const allTasks = await db.select().from(tasks).orderBy(desc(tasks.created_at));
        return reply.code(200).send(allTasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Get tasks by user ID
export const getTasksByUserId = async (req, reply) => {
    const { userId } = req.params;
    try {
        const userTasks = await db.select().from(tasks).where(eq(tasks.user_id, userId));
        return reply.code(200).send(userTasks);
    }
    catch (error) {
        console.error('Error fetching tasks:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Get a task by ID
export const getTaskById = async (req, reply) => {
    const { id } = req.params;
    try {
        const task = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
        if (task.length === 0) {
            return reply.code(404).send({ error: 'Task not found' });
        }
        return reply.code(200).send(task[0]);
    }
    catch (error) {
        console.error('Error fetching task:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Create a new task
export const createTask = async (req, reply) => {
    const { title, description, completed, user_id } = req.body;
    try {
        const newTask = await db.insert(tasks)
            .values({ title, description, completed, user_id })
            .returning();
        return reply.code(201).send(newTask[0]);
    }
    catch (error) {
        console.error('Error creating task:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Update a task
export const updateTask = async (req, reply) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    try {
        const updatedTask = await db.update(tasks)
            .set({
            title,
            description,
            completed,
            updated_at: new Date()
        })
            .where(eq(tasks.id, id))
            .returning();
        if (updatedTask.length === 0) {
            return reply.code(404).send({ error: 'Task not found' });
        }
        return reply.code(200).send(updatedTask[0]);
    }
    catch (error) {
        console.error('Error updating task:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Delete a task
export const deleteTask = async (req, reply) => {
    const { id } = req.params;
    try {
        const deletedTask = await db.delete(tasks)
            .where(eq(tasks.id, id))
            .returning();
        if (deletedTask.length === 0) {
            return reply.code(404).send({ error: 'Task not found' });
        }
        return reply.code(200).send({ message: 'Task deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting task:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
