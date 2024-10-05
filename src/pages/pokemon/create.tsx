import React, { ChangeEvent, useId, useState } from "react";
import Image from "next/image";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import TagsInputComponent from "~/components/tagsInputComponent";
export default function CreatePokemon() {
  const [pokemonPreview, setPokemonPreview] = useState<string | null>(null);
  const [evolutionPreview, setEvolutionPreview] = useState<string | null>(null);
  const [abilities, setAbilities] = useState<string[]>([]);
  const [eggGroups, setEggGroups] = useState<string[]>([]);
  const handlePokemonPreviewChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("pokemon");
      const fileUrl = URL.createObjectURL(file);
      setPokemonPreview(fileUrl);
    }
  };

  const handleEvolutionPreviewChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("evolucion");
      const fileUrl = URL.createObjectURL(file);
      setEvolutionPreview(fileUrl);
    }
  };

  function handleAbilities(tags: string[]): void {
    setAbilities(tags);
  }
  function handleEggsGroups(tags: string[]): void {
    setEggGroups(tags);
  }

  console.log(abilities);
  console.log(eggGroups);

  return (
    <div className="mx-auto my-10 flex w-1/3 min-w-max grow flex-col gap-4 rounded-xl bg-[#000000B2] px-6 py-8 text-white">
      <div className="text-2xl font-bold">New Pokemon</div>
      <div className=" flex justify-between gap-4">
        <input
          type="text"
          className="focus:outline-bg-none grow rounded bg-[#272727] px-4 focus:outline-none"
          placeholder="Name"
        />
        <input
          type="text"
          className="grow rounded bg-[#272727] px-4 py-1 focus:outline-none"
          placeholder="Number"
        />
      </div>
      <div className=" flex flex-col items-center rounded-lg bg-[#272727] p-4">
        <span className="font-bold">Pokemon Photo</span>
        <SelectPictureComponent
          handler={handlePokemonPreviewChange}
          imagePreview={pokemonPreview}
        />
      </div>
      <input
        type="text"
        placeholder="type"
        className="rounded bg-[#272727] px-4 py-2 focus:outline-none"
      />
      <textarea
        placeholder="Description"
        className="rounded bg-[#272727] px-4 py-1 focus:outline-none"
      />
      <div className="flex justify-between gap-4">
        <input
          type="text"
          placeholder="Height"
          className="grow rounded-lg bg-[#272727] px-4 py-2 focus:outline-none "
        />
        <input
          type="text"
          placeholder="weight"
          className="grow rounded-lg bg-[#272727] px-4 py-2 focus:outline-none"
        />
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-4 rounded bg-[#272727] px-4 py-2">
          <IoMdMale />
          <input
            type="text"
            placeholder="gender ratio"
            className=" rounded-lg bg-[#272727] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4 rounded bg-[#272727] px-4 py-2">
          <IoMdFemale />
          <input
            type="text"
            placeholder="gender ratio"
            className="   rounded-lg bg-[#272727] focus:outline-none"
          />
        </div>
      </div>
      <TagsInputComponent
        placeholder={"abilities"}
        handleTags={handleAbilities}
      />
      <TagsInputComponent
        placeholder="egg groups"
        handleTags={handleEggsGroups}
      />
      <input
        type="text"
        placeholder="evolution description"
        className="  rounded-lg bg-[#272727] px-4 py-2 focus:outline-none"
      />
      <div className=" flex flex-col items-center rounded-lg bg-[#272727] p-4">
        <span className="font-bold">Evolution Photo</span>
        <SelectPictureComponent
          handler={handleEvolutionPreviewChange}
          imagePreview={evolutionPreview}
        />
      </div>
      <div className="flex justify-end gap-2">
        <button className="w-24 rounded-lg bg-white p-2 text-black">
          Cancel
        </button>
        <button className="w-24 rounded-lg bg-[#272727] p-2 text-white">
          save
        </button>
      </div>
    </div>
  );
}

function SelectPictureComponent({
  handler,
  imagePreview,
}: {
  handler: (event: ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | null;
}) {
  //console.log("image selected", imagePreview);
  const id = useId(); // Generar un ID único para cada instancia

  return (
    <div className="mt-4 w-36 rounded-md border border-white bg-transparent p-4 shadow-md">
      <label
        htmlFor={id}
        className="flex cursor-pointer flex-col items-center gap-2"
      >
        {imagePreview ? (
          <Image
            src={imagePreview}
            alt="Preview"
            className="h-10 w-10 object-cover"
            width={100}
            height={100}
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 fill-white stroke-gray-500"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
        <span className="font-medium text-white">Upload file</span>
      </label>
      <input id={id} type="file" className="hidden" onChange={handler} />
    </div>
  );
}
