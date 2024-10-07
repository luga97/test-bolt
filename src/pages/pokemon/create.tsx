import React, { ChangeEvent, FormEvent, useId, useState } from "react";
import Image from "next/image";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import TagsInputComponent from "~/components/tagsInputComponent";
import { Router, useRouter } from "next/router";
import { SelectPictureComponent } from "~/components/SelectPictureComponent";
import { MdError } from "react-icons/md";
import { useSweetAlert } from "~/hooks/useSweetAlert";
import { Pokemon } from "~/types";
export default function CreatePokemon() {
  const router = useRouter();
  const { showAlert, showConfirm } = useSweetAlert();

  const [pokemonName, setPokemonName] = useState("");
  const [pokemonPreview, setPokemonPreview] = useState<File | undefined>();
  const [pokemonType, setPokemonType] = useState("");
  const [pokemonDescription, setPokemonDescription] = useState("");
  const [pokemonHeight, setPokemonHeight] = useState<number | undefined>();
  const [pokemonWeight, setPokemonWeight] = useState<number | undefined>();
  const [maleGenderRadio, setMaleGenderRadio] = useState<number | undefined>();
  const [femaleGenderRadio, setFemaleGenderRadio] = useState<
    number | undefined
  >();
  const [abilities, setAbilities] = useState<string[]>([]);
  const [eggGroups, setEggGroups] = useState<string[]>([]);
  const [evolutionDescription, setEvolutionDescription] = useState("");
  const [evolutionPreview, setEvolutionPreview] = useState<File | undefined>();
  const [errorOnsubmit, setErrorOnSubmit] = useState<string | undefined>();
  const handlePokemonPreviewChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      //console.log("pokemon");
      //const fileUrl = URL.createObjectURL(file);
      setPokemonPreview(file);
    }
  };

  const handleEvolutionPreviewChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("evolucion");
      setEvolutionPreview(file);
    }
  };

  function handleAbilities(tags: string[]): void {
    setAbilities(tags);
  }
  function handleEggsGroups(tags: string[]): void {
    setEggGroups(tags);
  }

  async function onSubmit() {
    const isAllFilled =
      Boolean(pokemonName) &&
      Boolean(pokemonPreview) &&
      Boolean(pokemonType) &&
      Boolean(pokemonDescription) &&
      Boolean(pokemonHeight) &&
      Boolean(pokemonWeight) &&
      Boolean(maleGenderRadio) &&
      Boolean(femaleGenderRadio) &&
      abilities.length > 0 &&
      eggGroups.length > 0 &&
      Boolean(evolutionDescription) &&
      Boolean(evolutionPreview);
    console.log("onsubmit", isAllFilled);

    if (isAllFilled) {
      try {
        const data = new FormData();
        data.append("name", pokemonName);
        data.append("imgUri", pokemonPreview!);
        data.append("type", pokemonType);
        data.append("description", pokemonDescription);
        data.append("height", String(pokemonHeight));
        data.append("weight", String(pokemonWeight));
        data.append("GenderRadioMale", String(maleGenderRadio));
        data.append("GenderRadioFemale", String(femaleGenderRadio));
        data.append("abilities", abilities.join(","));
        data.append("eggGroups", eggGroups.join(","));
        data.append("evolutionDescription", evolutionDescription);
        data.append("evolutionImgUri", evolutionPreview!);

        const response = await fetch("/api/pokemon", {
          method: "POST",

          body: data,
        });

        if (!response.ok) {
          throw new Error("Error al hacer la solicitud");
        }

        await showAlert({
          title: "Pokemon saved!",
          text: "your pokemon is already saved",
        });
        await router.push("/pokedex");
        alert("Formulario enviado con éxito");
      } catch (error) {
        console.error("Error al enviar los datos:", error);
        alert("Hubo un error al enviar el formulario");
      }
    } else {
      setErrorOnSubmit("please fill all the fields");
    }
  }

  async function handleCancel() {
    const result = await showConfirm({
      title: "alert",
      text: "Are you sure that you want cancel?",
    });
    if (result.isConfirmed) {
      await router.push("/pokedex");
    }
  }
  return (
    <div className="mx-auto my-10 flex w-1/3 min-w-max grow flex-col gap-4 rounded-xl bg-[#000000B2] px-6 py-8 text-white">
      <div className="text-2xl font-bold">New Pokemon</div>
      <div className=" flex justify-between gap-4">
        <input
          type="text"
          className="focus:outline-bg-none grow rounded bg-[#272727] px-4 py-2 focus:outline-none"
          placeholder="Name"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
        />
      </div>
      <div className=" flex flex-col items-center rounded-lg bg-[#272727] p-4">
        <span className="font-bold">Pokemon Photo</span>
        <SelectPictureComponent
          handler={handlePokemonPreviewChange}
          imagePreview={
            pokemonPreview ? URL.createObjectURL(pokemonPreview) : undefined
          }
        />
      </div>
      <input
        type="text"
        placeholder="type"
        className="rounded bg-[#272727] px-4 py-2 focus:outline-none"
        value={pokemonType}
        onChange={(e) => setPokemonType(e.target.value)}
      />
      <textarea
        placeholder="Description"
        className="rounded bg-[#272727] px-4 py-1 focus:outline-none"
        value={pokemonDescription}
        onChange={(e) => setPokemonDescription(e.target.value)}
      />
      <div className="flex justify-between gap-4">
        <input
          type="number"
          placeholder="Height"
          className="grow rounded-lg bg-[#272727] px-4 py-2 focus:outline-none "
          value={pokemonHeight}
          onChange={(e) => setPokemonHeight(parseInt(e.target.value))}
        />
        <input
          type="number"
          placeholder="weight"
          className="grow rounded-lg bg-[#272727] px-4 py-2 focus:outline-none"
          value={pokemonWeight}
          onChange={(e) => setPokemonWeight(parseInt(e.target.value))}
        />
      </div>
      <div className="flex gap-4">
        <div className="flex items-center gap-4 rounded bg-[#272727] px-4 py-2">
          <IoMdMale />
          <input
            type="number"
            placeholder="gender ratio"
            className=" rounded-lg bg-[#272727] focus:outline-none"
            value={maleGenderRadio}
            onChange={(e) => setMaleGenderRadio(parseInt(e.target.value))}
          />
        </div>
        <div className="flex items-center gap-4 rounded bg-[#272727] px-4 py-2">
          <IoMdFemale />
          <input
            type="number"
            placeholder="gender ratio"
            className="   rounded-lg bg-[#272727] focus:outline-none"
            value={femaleGenderRadio}
            onChange={(e) => setFemaleGenderRadio(parseInt(e.target.value))}
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
        value={evolutionDescription}
        onChange={(e) => setEvolutionDescription(e.target.value)}
      />
      <div className=" flex flex-col items-center rounded-lg bg-[#272727] p-4">
        <span className="font-bold">Evolution Photo</span>
        <SelectPictureComponent
          handler={handleEvolutionPreviewChange}
          imagePreview={
            evolutionPreview ? URL.createObjectURL(evolutionPreview) : undefined
          }
        />
      </div>
      <div
        className={`${
          errorOnsubmit == undefined ? "hidden" : "flex"
        } items-center justify-end gap-2 text-red-500`}
      >
        <MdError size={22} />
        <span className="text-right font-bold">{errorOnsubmit}</span>
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={handleCancel}
          className="w-24 rounded-lg bg-white p-2 text-black"
        >
          Cancel
        </button>
        <button
          onClick={onSubmit}
          className="w-24 rounded-lg bg-[#272727] p-2 text-white"
        >
          save
        </button>
      </div>
    </div>
  );
}
