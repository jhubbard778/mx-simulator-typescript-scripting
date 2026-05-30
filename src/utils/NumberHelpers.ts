/**
 * Converts raw seconds to time string
 * Example: 119.564 -> 1:59.564
 * @param time The time in seconds to convert
 * @returns a time string
 */
export const timeToString = (time: number): string => {
  let brokenTime = breakTime(time);

  let s = leftFillString(brokenTime.min.toString(), " ", 0) + ":";
  s += leftFillString(brokenTime.sec.toString(), "0", 2) + ".";
  s += leftFillString(brokenTime.ms.toString(), "0", 3);

  return s;
}

const breakTime = (time: number): { min: number, sec: number, ms: number } => {
  let ms = Math.floor(time * 1000.0);
  let sec = Math.floor(ms / 1000);
  let min = Math.floor(sec / 60);

  ms -= sec * 1000;
  sec -= min * 60;

  return { min: min, sec: sec, ms: ms };
}

const leftFillString = (string: string, pad: string, n: number): string => {
    n -= string.length;

    while (n > 0) {
        if (n & 1) {
            string = pad + string;
        }

        n >>= 1;
        pad += pad;
    }

    return string;
}

export const calculateDistance2d = (point1: Cartesian2d, point2: Cartesian2d): number => {
    return Math.sqrt(
        Math.pow(point2.x - point1.x, 2) +
        Math.pow(point2.y - point1.y, 2)
    );
}

export const calculateDistance3d = (point1: Cartesian3d, point2: Cartesian3d): number => {
    return Math.sqrt(
        Math.pow(point2.x - point1.x, 2) +
        Math.pow(point2.y - point1.y, 2) +
        Math.pow(point2.z - point1.z, 2)
    );
}

export type Cartesian2d = { x: number, y: number }
export type Cartesian3d = { x: number, y: number, z: number };

export const arrayToCartesian2d = (array: Vec2): Cartesian2d => {
    return { x: array[0], y: array[1] };
}

export const arrayToCartesian3d = (array: Vec3): Cartesian3d => {
    return { x: array[0], y: array[1], z: array[2] }; 
}

const isEdgeCrossingY = (a: Cartesian2d, b: Cartesian2d, y: number): boolean => {
    return (a.y > y) !== (b.y > y);
}

const getEdgeXAtY = (a: Cartesian2d, b: Cartesian2d, y: number): number => {
    return ((b.x - a.x) * (y - a.y) / (b.y - a.y)) + a.x;
}

export const isPointInPolygon = (point: Cartesian2d, polygon: Cartesian2d[]): boolean => {
    let inside = false;

    for (let i = 0, j = polygon.length; i < polygon.length; i++) {
        const a = polygon[i];
        const b = polygon[j];

        if (isEdgeCrossingY(a, b, point.y) && point.x < getEdgeXAtY(a, b, point.y)) {
            inside = !inside;
        }

        j = i;
    }
    
    return inside;
}

export const getNumberSuffix = (num: number): string => {
    const lastTwoDigits = num % 100;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 13) return "th";

    switch (lastTwoDigits % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

export const randomIntegerBetween = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const randomNumberBetween = (min: number, max: number): number => {
    return Math.random() * (max - min) + min
};