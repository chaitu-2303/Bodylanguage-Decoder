const express = require('express');
const multer = require('multer');
const router = express.Router();
const Action = require('./models/Action');

const upload = multer({ storage: multer.memoryStorage() });

// Health
router.get('/health', (req, res) => res.json({ ok: true }));

// Record a training action (optionally upload model files or metadata)
router.post('/train', upload.single('file'), async (req, res) => {
  try {
    const metadata = {
      filename: req.file ? req.file.originalname : undefined,
      body: req.body,
      ip: req.ip,
    };
    const action = await Action.create({ type: 'train', user: req.body.user || 'anonymous', metadata });
    return res.json({ success: true, action });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Record a detection action and return a (mock) detection result
router.post('/detect', upload.none(), async (req, res) => {
  try {
    const { user } = req.body;
    const metadata = { input: req.body, ip: req.ip };
    const action = await Action.create({ type: 'detect', user: user || 'anonymous', metadata });

    // Mock detection payload — replace with real model inference
    const mockResult = {
      label: 'open_hands',
      confidence: 0.87,
    };

    return res.json({ success: true, action, result: mockResult });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// List actions (paginated)
router.get('/actions', async (req, res) => {
  const page = Math.max(0, parseInt(req.query.page || '0'));
  const limit = Math.min(100, parseInt(req.query.limit || '50'));
  const actions = await Action.find().sort({ timestamp: -1 }).skip(page * limit).limit(limit).lean();
  return res.json({ success: true, actions });
});

module.exports = router;
