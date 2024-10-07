import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SpinnerComponent } from "~/components/SpinnerComponent";
import { Pokemon } from "~/types";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name="description"
          content="Condorsoft technical test - poxedex"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex grow items-center justify-center">
        <PokedexComponent />
      </div>
    </>
  );
}

function PokedexComponent() {
  const [pokemon, setPokemon] = useState<Pokemon | undefined>();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    void handleSearch();
  }, []);

  async function handleSearch() {
    setPokemon(undefined);

    try {
      const result = await fetch(`/api/pokemon/random`);

      const resultJson = (await result.json()) as Pokemon;
      console.log({ resultJson });
      setPokemon(resultJson);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="relative">
      <Image
        src={"/img/pokedex-skeleton.png"}
        width={700}
        height={700}
        alt="pokedex skeleton"
      ></Image>
      {/* pokemon description */}
      {!loading && pokemon ? (
        <>
          <div className="absolute left-[63px] top-[165px] max-h-36 w-56 ">
            <div className="flex justify-between">
              <span className="font-bold">{pokemon.name}</span>
              <span className="font-semibold">N° {pokemon.number}</span>
            </div>
            <span className="my-1 block text-xs">{pokemon.type}</span>
            <p className="text-xs">{pokemon.description}</p>
            <div className="mt-2 flex justify-around ">
              <div className="flex flex-col align-middle text-sm">
                <span className="font-semibold">Height</span>
                <span>{pokemon.height} mts</span>
              </div>
              <div className="flex flex-col align-middle text-sm">
                <span className="font-semibold">Weight</span>
                <span>{[pokemon.weight]} lbs</span>
              </div>
            </div>
          </div>
          <Image
            src={pokemon.imgUri}
            width={200}
            height={200}
            alt="pokedex skeleton"
            className="absolute right-16 top-48 "
          ></Image>
          <span
            onClick={handleSearch}
            className="absolute bottom-[45px] left-[106px] cursor-pointer text-xl font-bold"
          >
            Search
          </span>
          <span
            onClick={() => router.push(`/pokemon/${pokemon.number}`)}
            className="absolute bottom-[44px] right-[185px] cursor-pointer font-bold"
          >
            View More
          </span>
        </>
      ) : (
        <div className="absolute right-[140px] top-[250px] ">
          <SpinnerComponent />
        </div>
      )}
    </div>
  );
}
