

export const createSnapshotCanvas = (canvasElement: HTMLCanvasElement): Promise<Blob | null> => {
    return new Promise((resolve) => {
        canvasElement.toBlob((blob) => {
            resolve(blob)
        }, 'image/png')
    })
}

export const getBlob = async (canvasElement: HTMLCanvasElement) => {
    const canvasSnapshot = await createSnapshotCanvas(canvasElement)
    return canvasSnapshot
}