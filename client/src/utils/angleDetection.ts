export const angleStringValue = (radian: number) => {
    const angleConv = Math.round(radian * (180/Math.PI))
    return angleConv
}