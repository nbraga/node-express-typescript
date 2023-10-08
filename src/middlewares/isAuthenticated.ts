import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { logger } from "src/libs/Winston";

interface Payload {
    _id: string;
    email: string;
}

export function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    const [, token] = authToken.split(" ");

    try {
        const { _id, email } = verify(token, process.env.JWT_SECRET) as Payload;

        request.user_id = _id;
        request.user_email = email;

        return next();
    } catch (err) {
        logger.error(err);
        return response.status(401).end();
    }
}
