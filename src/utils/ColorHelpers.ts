export enum Colors {
    Normal = 'normal',
    Bright = 'bright',
    Black = 'black',
    Red = 'red',
    Orange = 'orange',
    Green = 'green',
    Yellow = 'yellow',
    Blue = 'blue',
    Magenta = 'magenta',
    Cyan = 'cyan',
    White = 'white'
}

export const ANSIColorMap: Partial<Record<Colors, string>> = {
	[Colors.Normal]: "\x1b[0m",
	[Colors.Bright]: "\x1b[1m",
	[Colors.Black]: "\x1b[30m",
	[Colors.Red]: "\x1b[31m",
	[Colors.Green]: "\x1b[32m",
	[Colors.Yellow]: "\x1b[33m",
	[Colors.Blue]: "\x1b[34m",
	[Colors.Magenta]: "\x1b[35m",
	[Colors.Cyan]: "\x1b[36m",
	[Colors.White]: "\x1b[37m"
};

export const brandRegExps = [
    { re: /^crf?[0-9]+/, color: Colors.Red },
    { re: /^rs[0-9]+cr/, color: Colors.Red },
    { re: /^fc[0-9]+/, color: Colors.White },
    { re: /^kx[0-9]+/, color: Colors.Green },
    { re: /^rs[0-9]+kx/, color: Colors.Green },
    { re: /^[0-9]+sx/, color: Colors.Orange },
    { re: /^rmz?[0-9]+/, color: Colors.Yellow },
    { re: /^rs[0-9]+rm/, color: Colors.Yellow },
    { re: /^yz[0-9]+/, color: Colors.Blue },
    { re: /^rs[0-9]+yz/, color: Colors.Blue },
    { re: /./, color: Colors.Normal },
] as const;

type BrandColor = typeof brandRegExps[number]["color"];
export const getBrandColor = (bikeModel: string): BrandColor => {
    for (const { re: brandRegex, color } of brandRegExps) {
        if (bikeModel.match(brandRegex)) return color;
    }

    return Colors.Normal;
}

export const colorToANSI = (color: Colors): string => {
    return ANSIColorMap[color] ?? ANSIColorMap[Colors.Normal]!;
}

export const messageToColoredText = (message: string, color: Colors): string => {
    return `${colorToANSI(color)}${message}${colorToANSI(Colors.Normal)}`
}