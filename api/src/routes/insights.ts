import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET /api/insights
router.get('/', async (req, res) => {
  try {
    const insights = await prisma.insight.findMany({
      include: { observation: true },
      orderBy: { timestamp: 'desc' }
    });
    res.json(insights);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
});

// GET /api/insights/:id
router.get('/:id', async (req, res) => {
  try {
    const insight = await prisma.insight.findUnique({
      where: { id: req.params.id },
      include: { observation: true }
    });
    
    if (!insight) {
      return res.status(404).json({ error: 'Insight not found' });
    }
    
    res.json(insight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch insight' });
  }
});

// POST /api/insights
router.post('/', async (req, res) => {
  try {
    const { observationId, type, content, confidence } = req.body;
    
    if (!observationId || !type || !content || confidence === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const insight = await prisma.insight.create({
      data: {
        observationId,
        type,
        content,
        confidence
      },
      include: { observation: true }
    });
    
    res.status(201).json(insight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create insight' });
  }
});

// PUT /api/insights/:id
router.put('/:id', async (req, res) => {
  try {
    const { type, content, confidence } = req.body;
    
    const insight = await prisma.insight.update({
      where: { id: req.params.id },
      data: { type, content, confidence },
      include: { observation: true }
    });
    
    res.json(insight);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update insight' });
  }
});

// DELETE /api/insights/:id
router.delete('/:id', async (req, res) => {
  try {
    await prisma.insight.delete({
      where: { id: req.params.id }
    });
    
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete insight' });
  }
});

export default router;
