import { NextFunction, Request, Response } from "express";
import { logger } from "src/libs/Winston";
import { ApiError } from "src/utils/api-errors";

export const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.statusCode ? error.message : "Internal Server Error";

    logger.error(
        `Error API: PATH: ${req.path} - METHOD: ${req.method} - HOSTNAME: ${req.hostname} - MESSAGE: ${message}`
    );

    return res.status(statusCode).send({ message });
};
