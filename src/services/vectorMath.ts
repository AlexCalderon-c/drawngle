const cosineSimilarity = (vecA: number[] | Float32Array, vecB: number[] | Float32Array): number => {
    let dotProduct: number = 0
    let normA: number = 0
    let normB: number = 0

    for(let i = 0; i < vecA.length; i++){
        dotProduct += vecA[i] * vecB[i]
        normA += vecA[i] * vecA[i]
        normB += vecB[i] * vecB[i]
    }

    return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
}