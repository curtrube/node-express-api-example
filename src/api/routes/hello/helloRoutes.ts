import helloController from '../../controllers/hello/helloController';
import { Router } from 'express';

const router = Router().get('/hello', helloController.getHello);

export default router;
