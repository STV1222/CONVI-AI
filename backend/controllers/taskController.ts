import { Request, Response } from 'express';
import prisma from '../prisma/client.js';

// Get all tasks
export const getTasks = async (req: Request, res: Response) => {
  const { projectId } = req.query;
  try {
    const tasks = await prisma.task.findMany({
      where: projectId ? { projectId: parseInt(projectId as string) } : undefined,
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
};

// Create a new task
export const createTask = async (req: Request, res: Response) => {
  const { projectId, name, status, startDate, estimatedDuration, completion } = req.body;
  try {
    const task = await prisma.task.create({
      data: {
        projectId,
        name,
        status: status || 'Pending',
        startDate: startDate ? new Date(startDate) : null,
        estimatedDuration,
        completion: completion || 0,
      },
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
};

// Update a task
export const updateTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, status, startDate, estimatedDuration, completion } = req.body;
  try {
    const task = await prisma.task.update({
      where: { id: parseInt(id) },
      data: {
        name,
        status,
        startDate: startDate ? new Date(startDate) : undefined,
        estimatedDuration,
        completion,
      },
    });
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error updating task' });
  }
};

// Delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.task.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting task' });
  }
};
