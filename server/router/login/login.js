import express from 'express';
import { connection } from '../../db.js';
import { isValidUsername, isValidPassword } from '../../lib/isValid.js';

export const loginAPIrouter = express.Router();

loginAPIrouter.post('/', postLogin)

loginAPIrouter.use((req, res) => {
    return res.status(400).json({
        status: 'error',
        data: 'This HTTP method is not valid',
    });
})

async function postLogin(req, res) {
    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null
    ) {
        return res.status(400).json({
            status: 'error',
            data: 'Data type must be object',
        })
    }

    const requiredFields = ['username', 'password']

    if (Object.keys(req.body).length !== requiredFields.length) {
        return res.status(400).json({
            status: 'error',
            data: `Invalid object length, required keys: ${requiredFields.join(',')}`,
        })
    }

    const { username, password } = req.body;

    const usernameError = isValidUsername(username)
    if (usernameError) {
        return res.status(400).json({
            status: 'error',
            data: usernameError,
        })
    }

    const passwordError = isValidPassword(password)
    if (passwordError) {
        return res.status(400).json({
            status: 'error',
            data: passwordError,
        })
    }

    let userData = null;

    try {
        const sql = 'SELECT * FROM users WHERE username = ? AND password = ?;';
        const result = await connection.execute(sql, [username, password])

        if (result[0].length !== 1) {
            return res.status(400).json({
                status: 'error',
                message: 'User account error, contact client support',
            });
        }
        userData = result[0][0];
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Technical issues, failed to log in, try again later',
        });
    }

    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < 20; i++) {
        token += abc[Math.floor(Math.random() * abc.length)];
    }

    try {
        const sql = `INSERT INTO users (token, user_id) VALUES (?,?);`;
        const result = await connection.execute(sql, [token, userData.id]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                message: 'Failed to create active session, try agin later',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            message: 'Technical issues, failed to log in, try again later',
        });
    }

    const cookie = [
        'loginToken' + token,
        'domain=localhost',
        'path=/',
        'max-age=3600',
        // 'Secure' ssl sertifikatai https,
        'SameSite=Lax',
        'HttpOnly',
    ]

    return res
        .set('Set-Cookie', cookie.join('; '))
        .status(200).json({
            status: 'success',
            message: 'Login was successful',
        });
}
