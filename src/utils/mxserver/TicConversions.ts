export const ticsPerSecond = 128;

export const ticsToMinutes = (tics: MXTics, floored: boolean = false): number => {
    const conv = ticsToSeconds(tics, false) / 60;
    return floored ? Math.floor(conv) : conv;
}

export const ticsToSeconds = (tics: MXTics, floored: boolean = false): number => {
    const conv = tics / ticsPerSecond;
    return floored ? Math.floor(conv) : conv;
}

export const minutesToTics = (minutes: number): MXTics => {
    return secondsToTics(minutes * 60);
}

export const secondsToTics = (seconds: number): MXTics => {
    return (seconds * ticsPerSecond) as MXTics;
}