import { Router } from 'express';
import dotenv from 'dotenv';
import { withJWTAuthMiddleware } from 'express-kun';

import * as UserController from './controllers/user';
import * as RestaurantController from './controllers/restaurant';
import * as LogController from './controllers/log';


dotenv.config();


const router = Router();
const protectedRouter = withJWTAuthMiddleware(router, process.env.PASSPHRASE);
// routes
router.post('/user/login', UserController.login);
router.post('/user/add', UserController.add);
router.get('/user/logout', UserController.logout);

router.get('/logs', LogController.all);
// protected routes
protectedRouter.get('/restaurants', RestaurantController.all);

export default router;
