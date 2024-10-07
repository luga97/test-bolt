// seed.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const pokemons = [
    { name: "Pikachu", type: "Electric" },
    { name: "Charmander", type: "Fire" },
    { name: "Bulbasaur", type: "Grass" },
  ];

  console.log("seeding", prisma);

  //   for (const pokemon of pokemons) {
  //     await prisma.pokemon.create({ data: pokemon });
  //   }

  console.log("Base de datos poblada con éxito!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    void prisma.$disconnect();
  });
