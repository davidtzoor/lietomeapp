import express from 'express';
import bole from 'bole';
import modelEvaluator from './model-evaluator';

const router = new express.Router();
const log = bole('model/router');

async function evaluateModelScore(req, res) {
  try {
    const { data } = req.body;
    const modelScore = await modelEvaluator(data);
    res.json(modelScore);
  } catch (e) {
    log.error(e, 'error evaluating model score');
    res.status(500).send(e);
  }
}

router.post('/model', evaluateModelScore);

export default router;
