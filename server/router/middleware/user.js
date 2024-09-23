import { connection } from '../db.js'
import { env } from '../../env.js';
export async function userDetails(req, res, next) {
    req.users = {
        isLoggedin: false,
        role: 'public',
        username: '',
    };

    const { cookies } = req;
    const tokenLength = 20;

    if (typeof cookies.loginToken === 'string' && cookies.loginToken.length === tokenLength) {
        try {
            const sql = `
            SELECT 
            users.username,
            users.created_at AS user_created_at,
            tokens.created_at AS tokens_created_at,
            FROM tokens
            Inner JOIN users ON tokens.user_id = user.id
            WHERE tokens.token = ? And tokens.created_at >= ?;`;
            const deadline = new Date(Date.now() - env.COOKIE_MAX_AGE * 1000);
            const [selectResult] = await connection.execute(sql, [cookies.loginToken, deadline])

            if (selectResult.length === 1) {
                req.user.isLoggedin = true;
                req.user.role = 'user';
                req.user.username = selectResult.username;
            }
        } catch (error) {
            console.log(error);
        }
    }
    next();
}