import { Request, Response } from "express";
import { sessionStore } from "./session-store";

export function userLogout(req: Request, res: Response) {
    const sessionCookie = req.cookies['SESSIONID'];
    sessionStore.destroySession(sessionCookie);
    res.clearCookie('SESSIONID');
    res.status(200).json({}); //If emty json is notsent, getting SyntaxError: Unexpected token O in JSON at position 0.
    // res.sendStatus(204);  //This also works ... but can be cached at browser.
}