import { Colors, getBrandColor } from "@/utils/ColorHelpers";

describe('brand colors to enum', () => {
    it('should be red for honda', () => {
        const bikes = ["rs50cr", "cr125", "cr250v2008", "crf250v2018", "crf450v2018"];

        bikes.forEach((bike) => {
            expect(getBrandColor(bike)).toBe(Colors.Red);
        });
    });

    it('should be orange for ktm', () => {
        const bikes = ["125sx", "250sxv2012", "350sxfv2017", "250sxfv2018", "450sxfv2018"];

        bikes.forEach((bike) => {
            expect(getBrandColor(bike)).toBe(Colors.Orange);
        });
    });

    it('should be yellow for suzuki', () => {
        const bikes = ["rs50rm", "rm125", "rm250v2008", "rmz250v2018", "rmz450v2018"];

        bikes.forEach((bike) => {
            expect(getBrandColor(bike)).toBe(Colors.Yellow);
        });
    });

    it('should be green for kawasaki', () => {
        const bikes = ["rs50kx", "kx125", "kx250v2008", "kx250fv2018", "kx450fv2018"];

        bikes.forEach((bike) => {
            expect(getBrandColor(bike)).toBe(Colors.Green);
        });
    });

    it('should be blue for yamaha', () => {
        const bikes = ["rs50yz", "yz125", "yz250v2008", "yz250fv2018", "yz450fv2018"];

        bikes.forEach((bike) => {
            expect(getBrandColor(bike)).toBe(Colors.Blue);
        });
    });

    it('should be white for husqvarna', () => {
        const bikes = ["fc250v2018", "fc450v2018"];

        bikes.forEach((bike) => {
            expect(getBrandColor(bike)).toBe(Colors.White);
        });
    });

    it('should be normal for unknown bike', () => {
        const unknownBikes = ["50", "125", "250", "450", "", "mc250", "mc125", "50cc", "sx125", "250kx"];
        unknownBikes.forEach((bike) => {
            expect(getBrandColor(bike)).toBe(Colors.Normal);
        });
    });
});