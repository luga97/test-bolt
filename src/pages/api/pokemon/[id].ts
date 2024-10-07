// pages/api/pokemon/[id].ts
import type { NextApiRequest, NextApiResponse } from "next";
import type { Pokemon as PokemonDTO } from "~/types";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log(req.method);
  if (req.method === "GET") {
    await getHandler(req, res);
  } else {
    res.status(405).json({ error: "method not allowed" });
  }
}

async function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing Pokemon ID" });
  }

  try {
    const p = await prisma.pokemon.findFirstOrThrow({
      where: { id: parseInt(id as string) },
    });
    const Abilities = p.abilities.split(",");
    const EggGroups = p.eggGroups.split(",");

    const data: PokemonDTO = {
      ...p,
      Abilities,
      EggGroups,
      number: p.id,
    } as PokemonDTO;

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
