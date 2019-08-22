


import moment = require("moment");
const util = require('util');
const crypto = require('crypto');
import * as jwt from 'jsonwebtoken';
import * as fs from "fs";
import { DbUser } from "./db-user";



export const randomBytes = util.promisify(crypto.randomBytes);

const signJWT = util.promisify(jwt.sign);

const RSA_PRIVATE_KEY = fs.readFileSync('./demos/private.key');

const RSA_PUBLIC_KEY = fs.readFileSync('./demos/public.key');

const SESSION_DURATION = 240; //seconds


export async function createSessionToken(user: DbUser) {
    return signJWT({
        email: user.email
    }, 
    RSA_PRIVATE_KEY, { 
        algorithm: 'RS256',
        issuer: 'ORG1',
        subject: user.id.toString(), //subject must be string. Throws error otherwise.
        expiresIn: SESSION_DURATION 
    });
}

export async function decodeJWT(token: string) {
    return jwt.verify(token, RSA_PUBLIC_KEY);
}