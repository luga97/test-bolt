// pages/api/pokemon/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { Pokemon } from "~/types";
import formidable, { IncomingForm, Files, Fields } from "formidable";
import path from "path";
import fs from "fs";

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

    //creating folder if not exist
    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    // Guarda cada archivo en la carpeta uploads
    Object.entries(files).forEach(([key, value]) => {
      const file = value![0]!; // Obtenemos el primer archivo
      const extension = path.extname(file.originalFilename!);
      const timestamp = Date.now();
      const newFilename = `${key}_${timestamp}${extension}`;

      const newFilePath = path.join(uploadsDir, newFilename);

      console.log(`for each at newpath=${newFilePath}`);
      fs.rename(file.filepath, newFilePath, (err) => {
        //console.log("rename callback");
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Error al guardar el archivo" });
        }
      });
    });

    console.log("files", files);
    console.log("fields", fields);
    // Lógica adicional para manejar los datos (guardarlos en una base de datos, etc.)
    return res.status(200).json({
      message: "Formulario recibido con éxito",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
}
