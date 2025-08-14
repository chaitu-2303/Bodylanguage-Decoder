import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { validateObservation } from '../validation/observation';

const router = Router();
const prisma = new PrismaClient();

// GET /api/observations
router.get('/', async (req, res) => {
  try {
    const observations = await prisma.observation.findMany({
      include: { insights: true },
      orderBy: { timestamp: 'desc' }
    });
    res.json(observations);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch observations' });
  }
});

// GET /api/observations/:id
router.get('/:id', async (req, res) => {
  try {
    const observation = await prisma.observation.findUnique({
      where: { id: req.params.id },
      include: { insights: true }
    });
    
    if (!observation) {
      return res.status(404).json({ error: 'Observation not found' });
    }
    
    res.json(observation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch observation' });
  }
});

// POST /api/observations
router.post('/', async (req, res) => {
  try {
    const validatedData = validateObservation(req.body);
    
    const observation = await prisma.observation.create({
      data: validatedData,
      include: { insights: true }
    });
    
    res.status(201).json(observation);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Validation')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create observation' });
    }
  }
});

// PUT /api/observations/:id
router.put('/:id', async (req, res) => {
  try {
    const validatedData = validateObservation(req.body);
    
    const observation = await prisma.observation.update({
      where: { id: req.params.id },
      data: validatedData,
      include: { insights: true }
    });
    
    res.json(observation);
  } catch (error) {
    if (error instanceof Error && error.message.includes('Validation')) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to update observation' });
    }
  }
});

// DELETE /api/observations/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.observation.delete({
      where: { id: req.params.id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete observation' });
  }
});

export default router;
