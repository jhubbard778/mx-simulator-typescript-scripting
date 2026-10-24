export class MXTicConverter {
    public static readonly ticsPerSecond = 128;
    public static readonly ticStepSize = 1 / this.ticsPerSecond;

    static ticsToMinutes(tics: MXTics, floored: boolean = false): number {
        const conv = this.ticsToSeconds(tics, false) / 60;
        return floored ? Math.floor(conv) : conv;
    }

    static ticsToSeconds(tics: MXTics, floored: boolean = false): number {
        const conv = tics * this.ticStepSize;
        return floored ? Math.floor(conv) : conv;
    }

    static minutesToTics(minutes: number): MXTics {
        return this.secondsToTics(minutes * 60);
    }

    static secondsToTics(seconds: number): MXTics {
        return (seconds * this.ticsPerSecond) as MXTics;
    }

    static ticsToSecondsTrimmed(tics: MXTics): string {
        return this.ticsToSeconds(tics).toFixed(3);
    }
}
