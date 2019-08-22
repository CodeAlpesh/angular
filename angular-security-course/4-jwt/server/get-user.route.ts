

import {Request, Response} from "express";
import { db } from "./database";



export function getUser(req:Request, res:Response) {

    //TODO retrieve the actual user based on JWT content
    const user = db.findUserById(req['USERID']);

    if (user) {
        res.status(200).json({id: user.id, email: user.email});
    }
    else {
        res.sendStatus(204);
    }
}
