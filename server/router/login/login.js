import express from 'express';
import { connection } from '../../db.js';
import { isValidUsername, isValidPassword } from '../../lib/isValid.js';
import { env } from '../../env.js';

export const loginAPIrouter = express.Router();

const tokenLength = 20;

loginAPIrouter.get('/', getLogin)
loginAPIrouter.post('/', postLogin)

loginAPIrouter.use((req, res) => {
    return res.status(400).json({
        status: 'error',
        data: 'This HTTP method is not valid',
    });
})

//login confirmation
async function getLogin(req, res) {


    return res.json({
        isLoggedIn: true,
    });
}

async function postLogin(req, res) {
    if (typeof req.body !== 'object'
        || Array.isArray(req.body)
        || req.body === null
    ) {
        return res.status(400).json({
            status: 'error',
            message: 'Data type must be object',
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
        const sql = 'SELECT * FROM users WHERE username = ?;';
        const result = await connection.execute(sql, [username]);

        if (result[0].length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'User not found, please check your username',
            });
        }

        if (result[0].length > 1) {
            return res.status(409).json({
                status: 'error',
                message: 'User account error, please contact support',
            });
        }

        const user = result[0][0];
        if (user.password !== password) {
            return res.status(401).json({
                status: 'error',
                message: 'Incorrect password, please try again',
            });
        }

        userData = user;

    } catch (error) {
        return res.status(500).json({
            status: 'error',
            message: 'Technical issues, failed to log in, try again later',
        });
    }

    const abc = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let token = '';

    for (let i = 0; i < tokenLength; i++) {
        token += abc[Math.floor(Math.random() * abc.length)];
    }

    try {
        const sql = `INSERT INTO tokens (token, user_id) VALUES (?, ?);`;
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
        'max-age=' + env.COOKIE_MAX_AGE,
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
