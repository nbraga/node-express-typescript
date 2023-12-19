import {
  S3,
  PutObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import fs from "fs";
import mime from "mime";
import path from "path";
import uploadConfig from "../config/multerConfig";
import { utilRemoveFileTemp } from "./removeFileTemp";
import { logger } from "./winston";

const ENVIRONMENT_FOLDER = process.env.AWS_ENVIRONMENT_FOLDER;

const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const config = {
  region: "sa-east-1",
  credentials,
};
class S3Storage {
  private client: S3;

  constructor() {
    this.client = new S3(config);
  }

  async saveFile(
    filename: string,
    aws_folder: string
  ): Promise<{
    success: string;
  }> {
    try {
      const originalPath = path.resolve(uploadConfig.directory, filename);

      const ContentType = mime.getType(originalPath);

      if (!ContentType) {
        throw new Error("File not found");
      }

      const key = `${ENVIRONMENT_FOLDER}/${aws_folder}/${filename}`;

      const fileContent = await fs.promises.readFile(originalPath);

      await this.client.send(
        new PutObjectCommand({
          Bucket: "clicsbucket",
          Key: key,
          ACL: "public-read",
          Body: fileContent,
          ContentType,
        })
      );

      await fs.promises.unlink(originalPath);
      utilRemoveFileTemp(filename);
      return {
        success: "S",
      };
    } catch (error) {
      logger.error(`Erro ao salvar arquivo no BUCKET: ${error}`);
      return {
        success: "N",
      };
    }
  }

  async deleteFile(
    filename: string,
    aws_folder: string
  ): Promise<{
    success: string;
  }> {
    try {
      const key = `${ENVIRONMENT_FOLDER}/${aws_folder}/${filename}`;
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: "clicsbucket",
          Key: key,
        })
      );
      return {
        success: "S",
      };
    } catch (error) {
      logger.error(`Erro ao excluir arquivo no BUCKET: ${error}`);
      return {
        success: "N",
      };
    }
  }

  async findFile(
    filename: string,
    aws_folder: string
  ): Promise<{
    success: string;
  }> {
    try {
      const key = `${ENVIRONMENT_FOLDER}/${aws_folder}/${filename}`;
      await this.client.send(
        new HeadObjectCommand({
          Bucket: "clicsbucket",
          Key: key,
        })
      );
      return {
        success: "S",
      };
    } catch (error) {
      logger.error(`Erro ao buscar arquivo no BUCKET: ${error}`);
      return {
        success: "N",
      };
    }
  }

  async downloadFile(filename: string, aws_folder: string) {
    try {
      const key = `${ENVIRONMENT_FOLDER}/${aws_folder}/${filename}`;
      const response = await this.client.send(
        new GetObjectCommand({
          Bucket: "clicsbucket",
          Key: key,
        })
      );

      const result = await response.Body.transformToByteArray();

      return result;
    } catch (error) {
      logger.error(`Erro ao buscar arquivo no BUCKET: ${error}`);
    }
  }
}

export default S3Storage;
