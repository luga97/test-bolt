import type { NextApiRequest, NextApiResponse } from "next";

import { PrismaClient } from "@prisma/client";
import type { Pokemon as PokemonDTO } from "~/types";
const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PokemonDTO[]>,
) {
  const pokemons2 = await prisma.pokemon.findMany();
  console.log(pokemons2);
  const response: PokemonDTO[] = pokemons2.map((p) => {
    const Abilities: string[] = p.abilities.split(",");
    const EggGroups: string[] = p.eggGroups.split(",");
    return { ...p, Abilities, EggGroups, number: p.id } as PokemonDTO;
  });
  console.log(response);
  res.status(200).json(response);
}
