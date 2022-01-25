import { writeFile } from "fs/promises"

export const ImageSaver = async(image: File) => {
    const name = Date.now().toString(36) + Math.random().toString(36).substring(2);
    await writeFile(`/images/${name}`, image.stream());
    return `images/${name}`;
}