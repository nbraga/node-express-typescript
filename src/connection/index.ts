import mongoose from "mongoose";
import { logger } from "src/libs/Winston";

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
        logger.info("Connected!");
    })
    .catch((error) => {
        logger.error(`Error connect database ${error}`);
    });

export const db = mongoose.connection;
