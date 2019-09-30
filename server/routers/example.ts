import * as express from 'express';
import * as asyncHandler from 'express-async-handler';

const router = express.Router();

router.get(
  '/example',
  asyncHandler(async (req: express.Request, res: express.Response) => {
    await new Promise(resolve => setTimeout(resolve, 3000));
    res.json({ example: req.query.text || 'hello' });
  }),
);

export default router;
