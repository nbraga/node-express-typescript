import crypto from "crypto";
import multer from "multer";
import { resolve } from "path";

const storage = (folder: string) =>
  multer.diskStorage({
    destination: resolve(__dirname, "..", "..", folder),
    filename: (request, file, callback) => {
      const fileHash = crypto.randomBytes(10).toString("hex");
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  });

export default function upload(folder: string) {
  return multer({
    dest: folder,
    storage: storage(folder),
    fileFilter: (req, file, callback) => {
      if (file.originalname === "blob") return callback(null, false);
      else if (
        file.mimetype !== "image/png" &&
        file.mimetype !== "image/jpg" &&
        file.mimetype !== "image/jpeg" &&
        file.mimetype !== "image/webp" &&
        file.mimetype !== "application/pdf"
      ) {
        return callback(null, false);
      } else {
        callback(null, true);
      }
    },
  });
}
