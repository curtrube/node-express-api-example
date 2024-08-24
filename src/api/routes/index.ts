import { Router } from 'express';
import helloRoutes from './hello/helloRoutes';

const routesV1 = Router().use(helloRoutes);

export default Router().use('/v1', routesV1);
