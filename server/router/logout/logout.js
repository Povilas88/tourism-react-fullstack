import express from 'express';
import { connection } from '../../db.js';
import { env } from '../../env.js';

export const logoutAPIrouter = express.Router();

logoutAPIrouter.get('/', getLogout);

logoutAPIrouter.use((req, res) => {
    return res.json({
        status: 'error',
        data: 'This HTTP method /api/login not available',
    });
});

async function getLogout(req, res) {
    if (!req.cookies.loginToken) {
        return res.json({
            status: 'error',
            msg: 'Non existant session',
        });
    }

    try {
        const sql = 'DELETE FROM tokens WHERE token = ?;';
        const result = await connection.execute(sql, [req.cookies.loginToken]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'User session error, try again later',
            });
        }
    } catch (error) {
        console.log(error);

        return res.json({
            status: 'error',
            msg: 'Log out failed, try again later',
        });
    }

    const cookie = [
        'loginToken=' + req.cookies.loginToken,
        'domain=localhost',
        'path=/',
        'max-age=-1',
        // 'Secure',
        'SameSite=Lax',
        'HttpOnly',
    ];

    return res
        .set('Set-Cookie', cookie.join('; '))
        .json({
            status: 'success',
            msg: 'Log in successful',
        });
}