import { Request, Response, NextFunction } from "express";
import { decodeJWT, createSessionToken } from "./security.utils";

// alternate name: retrieveUserIdFromRequest
export function parseJWT(req: Request, res: Response, next: NextFunction) {
    const jwtToken =  req.cookies['SESSIONID'];
    if(jwtToken) {
        handleSessionCookie(jwtToken, req).
            then(() => next()).
            catch((err) => {
                console.log(err.message);
                next();
            });
    } else {
        next();
    }
}

// This method will be called for every request. 
// Can result into an error. Expired token, invalid token etc. .. 
// This method returns promise ... there for execution will proceed with next() if you dont handle then/catch block. Timing issues will arise.
// Also in-case of unhandled error request is stalled.
async function handleSessionCookie(jwt: string, req: Request) {
    const payload = await decodeJWT(jwt);
    console.log(payload)
    req['USERID'] = payload.sub;
}