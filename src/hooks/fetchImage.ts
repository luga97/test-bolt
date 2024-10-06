export const fetchImage = async (imgUri: string): Promise<File | undefined> => {
  try {
    const response = await fetch(imgUri);
    if (!response.ok) {
      throw new Error("Error al obtener la imagen");
    }

    const blob = await response.blob(); // Convierte la respuesta en un blob
    const newFile = new File([blob], "example.png", { type: blob.type }); // Crea un objeto File
    return newFile; // Actualiza el estado con el archivo
  } catch (err: unknown) {
    console.error("error loading image");
  }
};
