import { pipeline } from "@xenova/transformers"
import { Buffer } from "buffer"

const extractor = await pipeline('image-feature-extraction', 'Xenova/clip-vit-base-patch32')

export const getEmbedding = async (input: string | Buffer): Promise<number[]> => {
    const output = await extractor(input as any)
    const arrayValue = Array.from(output.data)
    return arrayValue
}