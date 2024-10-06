import { ChangeEvent, useId } from "react";
import Image from "next/image";
export function SelectPictureComponent({
  handler,
  imagePreview,
}: {
  handler: (event: ChangeEvent<HTMLInputElement>) => void;
  imagePreview: string | undefined;
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
