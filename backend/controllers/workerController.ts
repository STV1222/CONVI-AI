import { Request, Response } from 'express';
import prisma from '../prisma/client.js';

// Get all workers
export const getWorkers = async (req: Request, res: Response) => {
  try {
    const workers = await prisma.worker.findMany();
    res.json(workers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching workers' });
  }
};

// Create a new worker
export const createWorker = async (req: Request, res: Response) => {
  const { name, skillType, dailyCapacity, availability } = req.body;
  try {
    const worker = await prisma.worker.create({
      data: {
        name,
        skillType,
        dailyCapacity: dailyCapacity || 8,
        availability: availability !== undefined ? availability : true,
      },
    });
    res.status(201).json(worker);
  } catch (error) {
    res.status(500).json({ error: 'Error creating worker' });
  }
};

// Update a worker
export const updateWorker = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, skillType, dailyCapacity, availability } = req.body;
  try {
    const worker = await prisma.worker.update({
      where: { id: parseInt(id) },
      data: {
        name,
        skillType,
        dailyCapacity,
        availability,
      },
    });
    res.json(worker);
  } catch (error) {
    res.status(500).json({ error: 'Error updating worker' });
  }
};

// Delete a worker
export const deleteWorker = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.worker.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting worker' });
  }
};
