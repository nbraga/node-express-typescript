import "express-async-errors";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express from "express";
import morgan from "morgan";
import { errorMiddleware } from "./middlewares/error";
import { router } from "./routes";
import { db } from "./connection";
import { serve, setup } from "swagger-ui-express";
import swaggerSetup from "./swagger-docs/swagger.json";
import { logger } from "./libs/Winston";

const app = express();

app.use(morgan("combined"));

app.use(cors());

app.use(express.json());

app.use("/api-docs", serve, setup(swaggerSetup));

app.use(process.env.PREFIX_URL, router);

app.use(errorMiddleware);

db.once("open", () => {
    logger.info("Confirmation connection database success!");
});

app.listen(process.env.PORT, () =>
    logger.info(`Server is running at ${process.env.PORT}.`)
);

export { app };
