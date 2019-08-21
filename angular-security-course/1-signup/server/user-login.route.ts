import { Request, Response } from "express";
import * as argon2 from "argon2";
import { sessionStore } from "./session-store";
import { db } from "./database";
import { randomBytes } from "./random-bytes";
import { DbUser } from "./dbuser.model";

export function userLogin(req: Request, res: Response) {
    const credentials = req.body;

    const user = db.findUserBtEmail(credentials.email);
    if(!user) {
        res.sendStatus(403); // Forbidden
    } else {
        login(user, credentials, res);
    }
}

async function login(user: DbUser, credentials, res: Response) {
    try {
        const sessionID = await attemptLogin(user, credentials);
        console.log(sessionID + " : " + user.email);
        res.cookie('SESSIONID', sessionID, {httpOnly : true, secure:true});
        res.status(200).json({id: user.id, email: user.email});
    } catch(err) {
        res.sendStatus(403); //Forbidden
    }
}

async function attemptLogin(user: DbUser, credentials) {
    const isPasswordValid = await argon2.verify(user.passwordDigest, credentials.password);
    if(!isPasswordValid) {
        throw new Error("Invalid password");
    }
    const sessionID = await randomBytes(32).then((rBytes) => rBytes.toString('hex'));
    sessionStore.createSession(sessionID, user);
    console.log(sessionID);
    return sessionID;
}