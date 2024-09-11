import dotenv from 'dotenv';

dotenv.config();

const e = process.env;

export const env = {
    SERVER_PORT: e.SERVER_PORT ?? 7000,
    CLIENT_PORT: e.CLIENT_PORT ?? 6999,
};