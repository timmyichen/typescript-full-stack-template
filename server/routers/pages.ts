import * as express from 'express';
import nextjs from 'server/lib/next';

const router = express.Router();

router.get('/', (req, res) => {
  nextjs.render(req, res, '/');
});

router.get('/sample', (req, res) => {
  nextjs.render(req, res, '/sample');
});

export default router;
