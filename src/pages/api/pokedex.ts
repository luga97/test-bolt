import type { NextApiRequest, NextApiResponse } from "next";
import { Pokemon } from "~/types";

type ResponseData = {
  pokemons: Pokemon[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Pokemon[]>,
) {
  const pokemons: Pokemon[] = Array(100).fill({
    name: "Pikachu",
    number: 25,
    type: "Electric",
    description:
      "When it is angered, it immediately discharges the energy stored in pouches in its cheeks.",
    imgUri: "https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png",
    height: 0.4, // en metros
    weight: 6.0, // en kilogramos
    GenderRadioMale: 50,
    GenderRadioFemale: 50,
    Abilities: ["Static", "Lightning Rod"],
    EggGroups: ["Field", "Fairy"],
    evolutionDescription:
      "Pikachu evolves into Raichu when exposed to a Thunder Stone.",
    evolutionImgUri:
      "https://assets.pokemon.com/assets/cms2/img/pokedex/full/026.png",
  }) as Pokemon[];
  res.status(200).json(pokemons);
}
