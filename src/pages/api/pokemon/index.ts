// pages/api/pokemon/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs";
import { randomUUID } from "node:crypto";
import type { Pokemon } from "@prisma/client";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.setHeader("Allow", ["POST"]);
  await postHandler(req, res);
}

async function postHandler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({});

    const [fields, files] = await form.parse(req);

    console.log("files", files);
    console.log("fields", fields);

    const newPokemon = await saveFiles(files);

    Object.entries(fields).forEach(([key, value]) => {
      const pokemonKey = key as keyof Pokemon;

      switch (pokemonKey) {
        case "number":
          newPokemon[pokemonKey] = parseFloat(value![0]!);
          break;
        case "name":
          newPokemon[pokemonKey] = value![0]!;
          break;
        case "type":
          newPokemon[pokemonKey] = value![0]!;
          break;
        case "description":
          newPokemon[pokemonKey] = value![0]!;
          break;
        case "height":
          newPokemon[pokemonKey] = parseFloat(value![0]!);
          break;
        case "weight":
          newPokemon[pokemonKey] = parseFloat(value![0]!);
          break;
        case "GenderRadioMale":
          newPokemon[pokemonKey] = parseFloat(value![0]!);
          break;
        case "GenderRadioFemale":
          newPokemon[pokemonKey] = parseFloat(value![0]!);
          break;
        case "abilities":
          newPokemon[pokemonKey] = value![0]!;
          break;
        case "eggGroups":
          newPokemon[pokemonKey] = value![0]!;
          break;
        case "evolutionDescription":
          newPokemon[pokemonKey] = value![0]!;
          break;
      }
    });
    console.log(newPokemon);
    //TODO Lógica adicional para manejar los datos (guardarlos en una base de datos, etc.)
    return res.status(200).json({
      message: "Formulario recibido con éxito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
async function saveFiles(files: formidable.Files<string>): Promise<Pokemon> {
  const result = {} as Pokemon;

  //creating folder if not exist
  const uploadsDir = path.join(process.cwd(), "public", "uploads");
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  for (const [key, value] of Object.entries(files)) {
    // console.log([key, value]);
    const file = value![0]!;
    const extension = path.extname(file.originalFilename!);
    const newFilename = `${key}_${randomUUID()}${extension}`;

    const newFilePath = path.join(uploadsDir, newFilename);

    await fs.promises.rename(file.filepath, newFilePath);
    console.log(`aqui la key es ${key}`);
    const pokemonKey = key as keyof Pokemon;
    switch (pokemonKey) {
      case "imgUri":
        result[pokemonKey] = `/img/upload/${newFilename}`;
        break;
      case "evolutionImgUri":
        result[pokemonKey] = `/img/upload/${newFilename}`;
        break;
      default:
        console.log("???", key);
      //TODO DELETE DEFAULT
    }
  }

  return result;
}
