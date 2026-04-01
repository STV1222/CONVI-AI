import { Request, Response } from 'express';
import prisma from '../prisma/client.js';

// Get all projects
export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching projects' });
  }
};

// Create a new project
export const createProject = async (req: Request, res: Response) => {
  const { name, location, startDate, endDate, type, status } = req.body;
  try {
    const project = await prisma.project.create({
      data: {
        name,
        location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        type,
        status: status || 'Active',
      },
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error creating project' });
  }
};

// Get a single project by ID
export const getProjectById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const project = await prisma.project.findUnique({
      where: { id: parseInt(id) },
      include: { tasks: true },
    });
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching project' });
  }
};

// Update a project
export const updateProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, location, startDate, endDate, type, status } = req.body;
  try {
    const project = await prisma.project.update({
      where: { id: parseInt(id) },
      data: {
        name,
        location,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : undefined,
        type,
        status,
      },
    });
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: 'Error updating project' });
  }
};

// Delete a project
export const deleteProject = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await prisma.project.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting project' });
  }
};
