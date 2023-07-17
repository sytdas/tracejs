import { Router } from 'express';

const router = Router();
/* GET home page. */
router.get('/*', async function(req, res, next) {
  res.json({ message: 'OK' })
});

export default router;
