import winston from "winston";

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
};

winston.addColors(colors);

const levels = {
    error: 0,
    warn: 1,
    info: 2,
};

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),

    winston.format.colorize({ all: true }),

    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`
    )
);

export const logger = winston.createLogger({
    levels,
    format,
    defaultMeta: { service: "user-service" },
    transports: [new winston.transports.Console()],
});
