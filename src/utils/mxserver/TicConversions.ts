export class MXTicConverter {
    public static readonly ticsPerSecond = 128;

    static ticsToMinutes(tics: MXTics, floored: boolean = false): number {
        const conv = this.ticsToSeconds(tics, false) / 60;
        return floored ? Math.floor(conv) : conv;
    }

    static ticsToSeconds(tics: MXTics, floored: boolean = false): number {
        const conv = tics / this.ticsPerSecond;
        return floored ? Math.floor(conv) : conv;
    }

    static minutesToTics(minutes: number): MXTics {
        return this.secondsToTics(minutes * 60);
    }

    static secondsToTics(seconds: number): MXTics {
        return (seconds * this.ticsPerSecond) as MXTics;
    }
}