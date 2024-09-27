import express from 'express';
import { locationsAPIrouter } from './locations/locations.js';
import { registerAPIrouter } from './register/register.js';
import { loginAPIrouter } from './login/login.js';
import { logoutAPIrouter } from './logout/logout.js';
import { likesListRouter } from './likes-list/likesList.js';
import { likeRouter } from './like/likeRouter.js';

export const apiRouter = express.Router();

apiRouter.use('/register', registerAPIrouter);
apiRouter.use('/login', loginAPIrouter);
apiRouter.use('/logout', logoutAPIrouter);
apiRouter.use('/locations', locationsAPIrouter);
apiRouter.use('/likes-list', likesListRouter);
apiRouter.use('/like', likeRouter);

apiRouter.all('/', (req, res) => {
    return res.json({
        status: 'error',
        msg: 'Issirink konkretu API endpointa',
    });
})