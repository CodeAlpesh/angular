import { Request, Response } from "express";
import { sessionStore } from "./session-store";

export function getUser(req: Request, res: Response) {
    let sessionId = req.cookies['SESSIONID'];
    let user = sessionStore.findUserBySessionId(sessionId);
    console.log()
    if(user) {
        res.status(200).json({ id: user.id, email: user.email });
    } else {
        // Request successful but No content
        // Also method name is sendStatus
        res.sendStatus(204);
    }
}