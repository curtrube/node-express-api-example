import helloController from '../../controllers/hello/helloHandler';
import { Router } from 'express';

const router = Router().get('/hello', helloController.getHello);

export default router;
