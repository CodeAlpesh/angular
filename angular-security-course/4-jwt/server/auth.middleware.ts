import { Request, Response, NextFunction } from "express";

// Alternate name: checkIfAuthenticated.
export function isUserAuthenticated(req: Request, res: Response, next: NextFunction) {
    if(req['USERID']) {
        console.log('User found ' + req['USERID']);
        next();
    } else {
        console.log('User not found');
        res.sendStatus(403);
    };
}