import express from 'express';
import { connection } from '../../db.js';
export const likesListRouter = express.Router();
likesListRouter.get('/', async (req, res) => {
    if (req.user.role !== 'user') {
        return res.json({
            status: 'error',
            msg: 'Patiktu lokaciju sarasas galimas tik regitruotiems ir prisijungusiems vartotojams',
        });
    }
    try {
        const sql = 'SELECT location_id FROM likes WHERE user_id = ?;';
        const [selectResult] = await connection.execute(sql, [req.user.id]);
        console.log(selectResult);
    } catch (error) {
        console.log(error);
        return res.json({
            status: 'error',
            msg: 'Nepavyko gauti issaugoto patiktu lokaciju saraso. Pabandykite veliau',
        });
    }
    return res.json({
        status: 'success',
        list: [],
    });
});