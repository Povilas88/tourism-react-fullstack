import express from 'express';
import { apiRouter } from './router/api.js';
const app = express();
const port = 5020;

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

app.listen(port, () => {
    console.log(`Tourism server: http://localhost:${port}`);
});