import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaTrash } from "react-icons/fa";
import { RiPencilFill } from "react-icons/ri";
import { type Pokemon } from "~/types";
import Image from "next/image";
import { FaArrowRightLong } from "react-icons/fa6";
import Link from "next/link";
import { SpinnerComponent } from "~/components/SpinnerComponent";
export default function PokemonDetail() {
  const {
    back,
    query: { id },
  } = useRouter();

  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const request = async () => {
      if (!id) {
        console.log("aqui");
        return;
      }
      try {
        const result = await fetch(`/api/pokemon/${id as string}`);

        if (result.status === 404) {
          throw Error("pokemon not found");
        }

        const resultJson = (await result.json()) as Pokemon;
        console.log({ resultJson });
        setPokemon(resultJson);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    void request();
  }, [id]);

  console.log(loading, id, pokemon);
  return (
    <>
      <Head>
        <title>Pokemon detail</title>
      </Head>
      <div className="flex grow justify-center py-10 align-middle">
        <div className="flex w-5/6 max-w-5xl flex-col gap-4 rounded-xl bg-[#000000B2] p-6 text-white">
          <div className="my-2 flex justify-between">
            <FaArrowLeft onClick={back} size={24} className="cursor-pointer" />
            <div className="flex gap-4">
              <Link
                href={`edit/${id as string}`}
                className="flex cursor-pointer items-center gap-2 self-stretch rounded bg-[#333] px-4 py-2"
              >
                <RiPencilFill />

                <span className="text-nowrap">Edit</span>
              </Link>
              <Link
                href={`delete/${id as string}`}
                className="flex cursor-pointer items-center gap-2 self-stretch rounded bg-[#333] px-4 py-2"
              >
                <FaTrash />

                <span className="text-nowrap">Delete</span>
              </Link>
            </div>
          </div>
          {loading ? (
            <SpinnerComponent />
          ) : pokemon ? (
            <div className="flex grow items-center">
              <Image
                src={pokemon.imgUri}
                alt="pokemon image"
                width={400}
                height={400}
              />
              {/* details */}
              <div className="grow self-stretch rounded-xl bg-[#272727] p-6">
                <div className="flex min-w-full justify-between">
                  <span className="text-2xl font-semibold">{pokemon.name}</span>
                  <span className="text-xl ">N° {pokemon.number}</span>
                </div>
                <span className="my-2 block text-[#F79328]">
                  {pokemon.type}
                </span>
                <p>{pokemon.description}</p>
                <div className="mt-4 flex justify-start gap-10">
                  <div className="items-center justify-start gap-2">
                    <span className="block font-semibold">Height</span>
                    <span>{pokemon.height} m</span>
                  </div>
                  <div className="items-center justify-start gap-2 text-start">
                    <span className="block font-semibold">Weight</span>
                    <span>{pokemon.weight} lbs</span>
                  </div>{" "}
                  <div className="items-center justify-start gap-2 text-start">
                    <span className="block font-semibold">Gender ratio</span>
                    <span className="mr-4">
                      {pokemon.GenderRadioMale}% &#9794;
                    </span>
                    <span>{pokemon.GenderRadioFemale}% &#9792;</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-start gap-10">
                  <div className="items-center justify-start gap-2">
                    <span className="block font-semibold">Habilities</span>
                    <span>{pokemon.Abilities?.join(", ")}</span>
                  </div>
                  <div className="items-center justify-start gap-2 text-start">
                    <span className="block font-semibold">Egg Groups</span>
                    <span>{pokemon.EggGroups?.join(", ")} </span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="block font-semibold">Evolutions</span>
                  <p>{pokemon.evolutionDescription}</p>
                </div>
                <div className="mt-4 flex h-48 items-center justify-around gap-6 self-stretch">
                  <Image
                    src={pokemon.imgUri}
                    alt="pokemon image"
                    width={200}
                    height={200}
                  />
                  <FaArrowRightLong size={60} />

                  <Image
                    src={pokemon.evolutionImgUri}
                    alt="pokemon evolution image"
                    width={200}
                    height={200}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div>POKEMON NOT FOUND</div>
          )}
        </div>
      </div>
    </>
  );
}
