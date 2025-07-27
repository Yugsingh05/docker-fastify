import { db } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';
// Get all users
export const getAllUsers = async (req, reply) => {
    try {
        const allUsers = await db.select().from(users);
        return reply.code(200).send(allUsers);
    }
    catch (error) {
        console.error('Error fetching users:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Get a user by ID
export const getUserById = async (req, reply) => {
    const { id } = req.params;
    try {
        const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
        if (user.length === 0) {
            return reply.code(404).send({ error: 'User not found' });
        }
        return reply.code(200).send(user[0]);
    }
    catch (error) {
        console.error('Error fetching user:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Create a new user
export const createUser = async (req, reply) => {
    const { name, email, password } = req.body;
    try {
        const newUser = await db.insert(users)
            .values({ name, email, password })
            .returning();
        return reply.code(201).send(newUser[0]);
    }
    catch (error) {
        console.error('Error creating user:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Update a user
export const updateUser = async (req, reply) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const updatedUser = await db.update(users)
            .set({
            name,
            email,
            updated_at: new Date()
        })
            .where(eq(users.id, id))
            .returning();
        if (updatedUser.length === 0) {
            return reply.code(404).send({ error: 'User not found' });
        }
        return reply.code(200).send(updatedUser[0]);
    }
    catch (error) {
        console.error('Error updating user:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
// Delete a user
export const deleteUser = async (req, reply) => {
    const { id } = req.params;
    try {
        const deletedUser = await db.delete(users)
            .where(eq(users.id, id))
            .returning();
        if (deletedUser.length === 0) {
            return reply.code(404).send({ error: 'User not found' });
        }
        return reply.code(200).send({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        return reply.code(500).send({ error: 'Internal Server Error' });
    }
};
