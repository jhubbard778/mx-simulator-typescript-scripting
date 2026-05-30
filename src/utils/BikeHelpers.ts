export const brandRegExps = [
    { re: /^crf?[0-9]+/, color: "red" },
    { re: /^fc[0-9]+/, color: "white" },
    { re: /^kx[0-9]+/, color: "green" },
    { re: /^[0-9]+sx/, color: "orange" },
    { re: /^rmz?[0-9]+/, color: "yellow" },
    { re: /^yz[0-9]+/, color: "blue" },
    { re: /./, color: "none" },
] as const;

type BrandColor = typeof brandRegExps[number]["color"];
  
export const getBrandColor = (bikeModel: string): BrandColor => {
    for (const { re: brandRegex, color } of brandRegExps) {
        if (bikeModel.match(brandRegex)) return color;
    }

    return "none";
}