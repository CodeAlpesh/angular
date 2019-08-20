import { Request, Response } from "express";
import { db } from './database';
import * as argon2 from 'argon2';
import { validatePassword } from './validate-password';
import { randomBytes } from "./random-bytes";
import { sessionStore } from "./session-store";

export function createUser(req: Request, res: Response) {
    const credentials = req.body;
    const errors = validatePassword(credentials.password);
    if(errors.length > 0) {
        res.status(400).json({error: errors});
    } else {
        createUserAndSession(credentials, res)
            .catch(err => {
                res.status(500).json({error: err.message})
            });
    }
}

async function createUserAndSession(credentials, response) {
    const passwordDigest = await argon2.hash(credentials.password);
    const user =  db.createUser(credentials.email, passwordDigest);
    const sessionId = await randomBytes(32).then((rBytes) => rBytes.toString('hex'));
    sessionStore.createSession(sessionId, user);
    console.log(sessionId + " : " + user);
    response.cookie('SESSIONID', sessionId, {httpOnly : true, secure:true});
    response.status(200).json({id: user.id, email: user.email});
}