import express from 'express';
import { createResidency ,getAllResidency,getResidency, removeResidency} from '../controller/residencyController.js';
const router = express.Router();
router.post('/create',createResidency)
router.delete(`/removeResidency/:id`,removeResidency)
router.get('/allResidency',getAllResidency)
router.get('/:id',getResidency)

export {router as residencyRoute}

