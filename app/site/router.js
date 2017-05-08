import express from 'express';
import { join } from 'path';

const router = new express.Router();

const home = (req, res) => {
  res.render('site/home');
};

router.use(express.static(join(__dirname, '../../wwwroot')));
router.get('/', home);

export default router;
