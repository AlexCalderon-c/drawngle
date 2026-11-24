class VectorCache{
    private cache = new Map<string, number[] | Float32Array>

    public get(url: string): number[] | Float32Array | undefined{
        return this.cache.get(url)
    }

    public set(url: string, vector: number[] | Float32Array){
        this.cache.set(url, vector)
    }

    public has(url: string): boolean {
        return this.cache.has(url)
    }
}