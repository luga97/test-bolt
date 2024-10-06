// pages/api/pokemon/[id].ts
import { NextApiRequest, NextApiResponse } from "next";
import { Pokemon } from "~/types";
import formidable, { IncomingForm, Files, Fields } from "formidable";

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
    getHandler(req, res);
  } else {
    res.status(405).json({ error: "method not allowed" });
  }
}

function getHandler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Missing Pokemon ID" });
  }

  try {
    //todo from database
    // const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    // if (!response.ok) {
    //   return res.status(response.status).json({ message: "Pokemon not found" });
    // }
    //const data: Pokemon = (await response.json()) as Pokemon;

    const data: Pokemon = {
      name: "Pikachu",
      number: 25,
      type: "Electric",
      description:
        "When it is angered, it immediately discharges the energy stored in pouches in its cheeks.",
      imgUri: "/img/pikachu.png",
      height: 0.4, // en metros
      weight: 6.0, // en kilogramos
      GenderRadioMale: 50,
      GenderRadioFemale: 50,
      Abilities: ["Static", "Lightning Rod"],
      EggGroups: ["Field", "Fairy"],
      evolutionDescription:
        "Pikachu evolves into Raichu when exposed to a Thunder Stone.",
      evolutionImgUri: "/img/pikachu_evol.png",
    };

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
