import { Request, Response } from 'express';
import prisma from '../prisma/client';

export const allocateWorkers = async (req: Request, res: Response) => {
  try {
    // 1. Fetch data from database
    const tasks = await prisma.task.findMany({
      where: {
        status: { not: 'Completed' }
      }
    });
    
    const workers = await prisma.worker.findMany({
      where: {
        availability: true
      }
    });

    // 2. Transform data for AI service
    const aiPayload = {
      tasks: tasks.map(t => ({
        id: t.id,
        name: t.name,
        skill_required: t.skillRequired || 'General', // Fallback
        estimated_duration: t.estimatedDuration || 1,
        priority: t.priority
      })),
      workers: workers.map(w => ({
        id: w.id,
        name: w.name,
        skill_type: w.skillType,
        daily_capacity: w.dailyCapacity,
        availability: w.availability
      }))
    };

    // 3. Call AI Service
    const aiServiceUrl = process.env.AI_SERVICE_URL || 'http://localhost:8000';
    const response = await fetch(`${aiServiceUrl}/allocate-workers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(aiPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Service Error:', errorText);
      return res.status(response.status).json({ 
        error: 'AI service error', 
        details: errorText 
      });
    }

    const result = await response.json();
    
    // 4. Return allocation suggestions
    // Ideally we would save these to the database or return them to the frontend to confirm
    res.json(result.allocations);

  } catch (error) {
    console.error('AI Allocation Error:', error);
    res.status(500).json({ error: 'Failed to generate worker allocation' });
  }
};
