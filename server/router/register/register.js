import express from 'express';
import { connection } from '../../db.js';
import { isValidUsername, isValidPassword } from '../../lib/isValid.js';

export const registerAPIrouter = express.Router();

registerAPIrouter.post('/', postRegister)

registerAPIrouter.use((req, res) => {
    return res.status(400).json({
        status: 'error',
        data: 'This HTTP method is not valid',
    });
})

async function postRegister(req, res) {
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

    try {
        const sql = `INSERT INTO users (username,password) VALUES (?,?);`;
        const result = await connection.execute(sql, [username, password]);

        if (result[0].affectedRows !== 1) {
            return res.json({
                status: 'error',
                data: 'Registration failed, user already exists',
            });
        }
    } catch (error) {
        return res.status(400).json({
            status: 'error',
            data: 'Technical issues, failed request, try again later',
        });
    }

    return res.status(200).json({
        status: 'success',
        data: 'Registration was successful',
    });
}
