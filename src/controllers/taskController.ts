import { FastifyReply, FastifyRequest } from 'fastify';
import { db } from '../db';
import { tasks } from '../db/schema';
import { eq } from 'drizzle-orm';

interface TaskParams {
  id: number;
}

interface CreateTaskBody {
  title: string;
  description?: string;
  completed?: boolean;
  user_id: number;
}

interface UpdateTaskBody {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Get all tasks
export const getAllTasks = async (req: FastifyRequest, reply: FastifyReply) => {
  try {
    const allTasks = await db.select().from(tasks);
    return reply.code(200).send(allTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
};

// Get tasks by user ID
export const getTasksByUserId = async (req: FastifyRequest<{
  Params: { userId: number };
}>, reply: FastifyReply) => {
  const { userId } = req.params;
  try {
    const userTasks = await db.select().from(tasks).where(eq(tasks.user_id, userId));
    return reply.code(200).send(userTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
};

// Get a task by ID
export const getTaskById = async (req: FastifyRequest<{
  Params: TaskParams;
}>, reply: FastifyReply) => {
  const { id } = req.params;
  try {
    const task = await db.select().from(tasks).where(eq(tasks.id, id)).limit(1);
    
    if (task.length === 0) {
      return reply.code(404).send({ error: 'Task not found' });
    }
    
    return reply.code(200).send(task[0]);
  } catch (error) {
    console.error('Error fetching task:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
};

// Create a new task
export const createTask = async (req: FastifyRequest<{
  Body: CreateTaskBody;
}>, reply: FastifyReply) => {
  const { title, description, completed, user_id } = req.body;
  
  try {
    const newTask = await db.insert(tasks)
      .values({ title, description, completed, user_id })
      .returning();
    
    return reply.code(201).send(newTask[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
};

// Update a task
export const updateTask = async (req: FastifyRequest<{
  Params: TaskParams;
  Body: UpdateTaskBody;
}>, reply: FastifyReply) => {
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
  } catch (error) {
    console.error('Error updating task:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
};

// Delete a task
export const deleteTask = async (req: FastifyRequest<{
  Params: TaskParams;
}>, reply: FastifyReply) => {
  const { id } = req.params;
  
  try {
    const deletedTask = await db.delete(tasks)
      .where(eq(tasks.id, id))
      .returning();
    
    if (deletedTask.length === 0) {
      return reply.code(404).send({ error: 'Task not found' });
    }
    
    return reply.code(200).send({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    return reply.code(500).send({ error: 'Internal Server Error' });
  }
};

