import express from 'express';
import { connection } from '../../db.js';

export const locationsAPIrouter = express.Router();

locationsAPIrouter.get('/', getLocations)

async function getLocations(req, res) {
    const sql = 'SELECT * FROM locations;';
    let dataFromServer = null;

    try {
        dataFromServer = await connection.execute(sql);
    } catch (error) {
        dataFromServer = [[]];
    }

    return res.status(200).json({
        status: 'success',
        data: dataFromServer[0],
    });
};
