import React, { useEffect, useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { IoFilterSharp, IoSearch } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { type Pokemon } from "~/types";
import { SpinnerComponent } from "~/components/SpinnerComponent";

export default function Pokedex() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const request = async () => {
      setLoading(true);
      const result = await fetch("/api/pokedex");
      const resultJson = (await result.json()) as Pokemon[];
      //console.log({ resultJson });
      setPokemons(resultJson);
      setLoading(false);
    };
    void request();
  }, []);

  return (
    <div className="flex grow justify-center py-10 align-middle">
      <div className="flex w-5/6 flex-col gap-4 rounded-xl bg-[#000000B2] p-6 text-white">
        <span className="text-2xl font-bold">Poxedex</span>
        <div className=" flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex max-w-2xl grow gap-8 self-stretch">
            <div className="flex w-full items-center gap-4 overflow-hidden rounded-xl bg-[#272727] pl-4">
              <IoSearch size={20} />

              <input
                type="text"
                placeholder="Search pokemon"
                className="h-10 w-full  bg-[#272727] focus:outline-none"
              ></input>
            </div>
            {/* TODO create a real filter */}
            <div className="flex cursor-pointer items-center gap-2 rounded bg-[#272727] px-4 py-2 text-[#ffffffb2]">
              <IoFilterSharp />

              <span>type</span>
            </div>
          </div>
          <Link
            href={"pokemon/create"}
            className="flex cursor-pointer items-center gap-2 self-stretch rounded bg-[#333] px-4 py-2"
          >
            <IoMdAddCircle size={24} />

            <span className="text-nowrap">Create new</span>
          </Link>
        </div>
        <div className="flex w-full flex-wrap items-center justify-around gap-8">
          {pokemons.length > 0 ? (
            pokemons.map((x) => <PokemonItemList key={x.name} pokemon={x} />)
          ) : loading ? (
            <SpinnerComponent />
          ) : (
            <div>NO DATA FOUND</div>
          )}
        </div>
      </div>
    </div>
  );
}

function PokemonItemList({ pokemon }: { pokemon: Pokemon }) {
  return (
    <Link href={`pokemon/${pokemon.number}`}>
      <div className="flex min-w-fit cursor-pointer flex-col items-center justify-center rounded-xl bg-[#272727] p-8 px-14">
        <Image
          src={pokemon.imgUri}
          width={120}
          height={120}
          alt="pokemon image"
          className="my-4"
        />
        <span className="text-sm">N° {pokemon.number}</span>
        <span className="font-bold">{pokemon.name}</span>
        <span className="text-[#F79328]">{pokemon.type}</span>
      </div>
    </Link>
  );
}
