import { Request, Response } from "express";
import { db } from './database';
import * as argon2 from 'argon2';
import { validatePassword } from './validate-password';

export function createUser(req: Request, res: Response) {
    const credentials = req.body;

    const errors = validatePassword(credentials.password);
    if(errors.length > 0) {
        res.status(400).json({error: errors});
    } else {
        argon2.hash(credentials.password).
            then(pwdDigest => {
                const user =  db.createUser(credentials.email, pwdDigest);
                res.status(200).json({id: user.id, email: user.email});
            }).catch(err => {
                res.status(500).json({error: err});
            });
    }
}