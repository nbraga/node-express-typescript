import { logger } from "./winston";

const fs = require("fs");
const path = require("path");

export const utilRemoveFileTemp = (nameFile: string) => {
  try {
    const pasta = "./tmp";
    const nomeArquivo = nameFile;

    fs.readdir(pasta, (err, arquivos) => {
      if (err) throw err;

      arquivos.forEach((arquivo) => {
        if (arquivo === nomeArquivo) {
          fs.unlink(path.join(pasta, arquivo), (err) => {
            if (err) throw err;
            console.log(`O arquivo ${arquivo} foi removido com sucesso!`);
          });
        }
      });
    });
  } catch (error) {
    logger.error(`Erro ao excluir arquivo no TMP: ${error}`);
  }
};
