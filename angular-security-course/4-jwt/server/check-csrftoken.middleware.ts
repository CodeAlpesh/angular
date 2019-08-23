import { Request, Response, NextFunction } from "express";

export function checkXsrfToken(req: Request, res: Response, next: NextFunction) {
    const xsrfToken = req.cookies['XSRF-TOKEN'];
    const xsrfHeader = req.headers['X-XSRF-TOKEN'];
    if(xsrfToken && xsrfHeader && xsrfToken === xsrfHeader) {
        next();
    } else {
        res.sendStatus(403);
    }
}