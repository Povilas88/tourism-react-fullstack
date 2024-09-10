import express from 'express'

export const apiRouter = express.Router();

apiRouter.get('/', (req, res) => {
    return res.json({
        status: 'error',
        message: 'Select specific API endpoint',
    })
})