import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  //const [text, setText] = useState("");

  // useEffect(() => {
  //   const request = async () => {
  //     const result = await fetch("/api/pokemon");
  //     // This is just an example to obtain data from the endpoint. Hint :) avoid no typesafety we hate that
  //     const resultJson = await result.json();
  //     console.log({ resultJson });
  //     setText(resultJson.message);
  //   };
  //   void request();
  // }, []);

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
  return (
    <div className="relative">
      <Image
        src={"/img/pokedex-skeleton.png"}
        width={700}
        height={700}
        alt="pokedex skeleton"
      ></Image>
      {/* pokemon description */}
      <div className="absolute left-[63px] top-[165px] max-h-36 w-56 ">
        <div className="flex justify-between">
          <span className="font-bold">Pikachu</span>
          <span className="font-semibold">N° 25</span>
        </div>
        <span className="my-1 block text-xs">electric</span>
        <p className="text-xs">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque,
          neque.
        </p>
        <div className="mt-2 flex justify-around ">
          <div className="flex flex-col align-middle text-sm">
            <span className="font-semibold">Height</span>
            <span>1' 04"</span>
          </div>
          <div className="flex flex-col align-middle text-sm">
            <span className="font-semibold">Weight</span>
            <span>13.2 lbs</span>
          </div>
        </div>
      </div>
      <span className="absolute bottom-[45px] left-[106px] cursor-pointer text-xl font-bold">
        Search
      </span>
      <Image
        src={"/img/pikachu.png"}
        width={200}
        height={200}
        alt="pokedex skeleton"
        className="absolute right-16 top-48 "
      ></Image>
      <span className="absolute bottom-[44px] right-[185px] cursor-pointer font-bold">
        View More
      </span>
    </div>
  );
}