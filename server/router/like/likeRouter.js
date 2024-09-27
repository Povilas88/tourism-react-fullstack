import express from 'express';
import { connection } from '../../db.js';

export const likeRouter = express.Router();

likeRouter.post('/', async (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(401).json({
            status: 'error',
            msg: 'I patiktu lokaciju sarasa galima itraukti nauja lokacija prisijungusiems vartotojams',
        });
    }

    const { locationId } = req.body;

    if (typeof locationId !== 'number'
        || !Number.isInteger(locationId)
        || locationId < 1
    ) {
        return res.status(400).json({
            status: 'error',
            msg: 'Lokacijos ID turi buti teigiamas sveikasis skaicius',
        });
    }

    try {
        const sql = 'SELECT * FROM likes WHERE user_id = ? AND location_id = ?;';
        const [result] = await connection.execute(sql, [req.user.id, locationId]);

        if (result.length !== 0) {
            return res.status(400).json({
                status: 'error',
                msg: 'Patiktukas jau buvo uzfiksuotas',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Nepavyko uzfiksuoti patiktuko',
        });
    }

    try {
        const sql = 'INSERT INTO likes (user_id, location_id) VALUES (?, ?);';
        const [result] = await connection.execute(sql, [req.user.id, locationId]);

        if (result.affectedRows !== 1) {
            return res.status(500).json({
                status: 'error',
                msg: 'Nepavyko uzfiksuoti patiktuko',
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 'error',
            msg: 'Nepavyko uzfiksuoti patiktuko',
        });
    }

    return res.status(201).json({
        status: 'success',
    });
});