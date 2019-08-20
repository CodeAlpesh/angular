

import {db} from "./database";
import { Request, Response } from "express";
import { sessionStore } from "./session-store";



export function readAllLessons(req: Request, res: Response) {

    const sessionId = req.cookies['SESSIONID'];
    const validSession = sessionStore.isValidSession(sessionId);
    if(validSession) {
        res.status(200).json({lessons: db.readAllLessons()});
    } else {
        res.sendStatus(403); 
        //UnAuthorized ... sendStatus
        //Used catchError operator to handle 403 in client - LessonsComponent.ts
    }
}