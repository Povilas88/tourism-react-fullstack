import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './env.js';
import { apiRouter } from './router/api.js';
import { cookieParser } from './router/middleware/cookie.js';
import { userDetails } from './router/middleware/user.js';

const corsOptions = {
    credentials: true,
    origin: 'http://localhost:' + env.CLIENT_PORT,
};

const helmetOptions = {
    crossOriginResourcePolicy: false,
};

const app = express();

app.use(express.json({
    type: 'application/json',
}));

app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(helmet(helmetOptions));

app.use(cookieParser)
app.use(userDetails)

app.use('/api', apiRouter);

app.all('*', (req, res) => {
    return res.status(404).json({
        status: 'error',
        message: 'Page not found',
    });
});

app.use((req, res, next) => {
    return res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send('Something broke!');
});

app.listen(env.SERVER_PORT, () => {
    console.log(`Server running on: http://localhost:${env.SERVER_PORT}`);
});