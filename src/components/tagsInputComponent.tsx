import {
  type ChangeEvent,
  type KeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { HiXMark } from "react-icons/hi2";

export default function TagsInputComponent({
  handleTags,
  placeholder,
}: {
  handleTags: (tags: string[]) => void;
  placeholder: string;
}) {
  const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    handleTags(tags);
  }, [handleTags, tags]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    console.log(event);
    if (
      (event.key === "Enter" || event.key === "," || event.key === "Tab") &&
      inputValue.trim() !== "" &&
      !inputValue.includes(",")
    ) {
      event.preventDefault();
      setTags((prevState) => [...prevState, inputValue]);
      setInputValue("");
    }

    if (event.key === "Backspace" && event.currentTarget.value === "") {
      //console.log("Se presionó eliminar en un campo vacío");
      setTags((prevState) => prevState.slice(0, -1));
    }
  };

  const deleteTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleClick = () => {
    if (inputRef.current) {
      inputRef.current.focus(); // Hace foco en el input
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex max-w-xl  grow-0 flex-wrap justify-start gap-2 rounded-lg bg-[#272727] px-4 py-2 text-white"
    >
      {tags.map((tag, index) => {
        return (
          <div
            className=" flex items-center rounded-xl bg-[#00000055] px-2 py-1"
            key={index}
          >
            <span className="mr-2 text-sm">{tag}</span>
            <HiXMark
              className="cursor-pointer"
              size={16}
              onClick={() => deleteTag(index)}
            />
          </div>
        );
      })}
      <input
        ref={inputRef}
        placeholder={tags.length === 0 ? placeholder : undefined}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className="min-w-0 grow bg-[#272727]  focus:outline-none"
      />
    </div>
  );
}
