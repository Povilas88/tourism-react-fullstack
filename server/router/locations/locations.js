import express from 'express';
import { connection } from '../../db.js';
import { isNonEmptyString } from '../../lib/isValid.js';

export const locationsAPIrouter = express.Router();

locationsAPIrouter.get('/', getLocations);
locationsAPIrouter.post('/', postLocations);

async function getLocations(req, res) {
    const sql = `
        SELECT locations.id as id, name, img, country, city, street, number, zip
        FROM locations
        INNER JOIN address
            ON address.id = locations.address_id;`;
    let dataFromServer = null;

    try {
        dataFromServer = await connection.execute(sql);
    } catch (error) {
        dataFromServer = [[]];
    }

    return res.json({
        status: 'success',
        data: dataFromServer[0],
    });
}

async function postLocations(req, res) {
    const { name, img, country, city } = req.body;
    let { street, number, zip } = req.body;

    const validName = isNonEmptyString(name);
    const validImg = isNonEmptyString(img);
    const validCountry = isNonEmptyString(country);
    const validCity = isNonEmptyString(city);
    const validStreet = isNonEmptyString(street);
    const validNumber = isNonEmptyString(number);
    const validZip = isNonEmptyString(zip);

    if (!validName || !validImg || !validCountry || !validCity) {
        return res.json({
            status: 'error',
            msg: 'Required information missing',
        });
    }

    if (!validStreet) {
        street = '';
    }
    if (!validNumber) {
        number = '';
    }
    if (!validZip) {
        zip = '';
    }

    let addressId = 0;

    // tikriname ar adresas jau egzistuoja
    try {
        const sql = `
            SELECT * FROM address 
            WHERE country = ? AND city = ? AND street = ? AND number = ? AND zip  = ?;`;
        const [responseData] = await connection.execute(sql, [country, city, street, number, zip]);

        if (responseData.length === 1) {
            addressId = responseData[0].id;
        }
    } catch (error) {
        console.log(error);

        return res.json({
            status: 'error',
            msg: 'Failed to create location',
        });
    }

    // jei adreso nera, tai sukuriam
    if (addressId === 0) {
        try {
            const sql = 'INSERT INTO address (country, city, street, number, zip) VALUE (?, ?, ?, ?, ?);';
            const [insertResult] = await connection.execute(sql, [country, city, street, number, zip]);

            if (insertResult.affectedRows === 1) {
                addressId = insertResult.insertId;
            }
        } catch (error) {
            console.log(error);

            return res.json({
                status: 'error',
                msg: 'Failed to create location',
            });
        }
    }

    try {
        const sql = 'INSERT INTO locations (name, img, address_id) VALUES (?, ?, ?);';
        const [insertResult] = await connection.execute(sql, [name, img, addressId]);

        if (insertResult.affectedRows !== 1) {
            return res.json({
                status: 'error',
                msg: 'Failed to create location',
            });
        }

    } catch (error) {
        console.log(error);

        return res.json({
            status: 'error',
            msg: 'Failed to create location',
        });
    }

    return res.json({
        status: 'success',
        msg: 'New location added',
    });
}