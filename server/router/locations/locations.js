import express from 'express';
import { connection } from '../../db.js';

export const locationsAPIrouter = express.Router();

locationsAPIrouter.get('/', async (req, res) => {
    const data = [
        {
            img: '/',
            name: 'Moon',
            address: {
                country: 'Space',
                city: 'A',
                street: 'A',
                number: 'A',
                zip: 'A',
            },
        },
        {
            img: '/',
            name: 'Flower',
            address: {
                country: 'Tundra',
                city: 'B',
                street: 'B',
                number: 'B',
                zip: 'B',
            },
        },
        {
            img: '/',
            name: 'Jellyfish',
            address: {
                country: 'Baltic sea',
                city: 'C',
                street: 'C',
                number: 'C',
                zip: 'C',
            },
        },
    ];

    const sql = 'SELECT * FROM locations;';
    const dataFromServer = await connection.execute(sql);

    return res.status(200).json({
        status: 'success',
        data: data,
    });
});