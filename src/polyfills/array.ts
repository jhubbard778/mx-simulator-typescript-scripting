if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement: any, fromIndex?: number): boolean {
        for (let i = fromIndex ?? 0; i < this.length; i++) {
            if (this[i] === searchElement) return true;
        }

        return false;
    }
}

if (!Array.prototype.flatMap) {
    Array.prototype.flatMap = function<T, U, This = undefined>(
        callback: (this: This, value: T, index: number, array: T[]) => U | ReadonlyArray<U>,
        thisArg: This
    ) {
        return this.reduce((acc, current, index, array) => {
            const mapped = callback.call(thisArg, current, index, array);
            return acc.concat(mapped);
        }, []);
    };
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function <A, D extends number = 1>(
    this: A,
    depth?: D
  ): FlatArray<A, D>[] {
    const depthNum = (depth ?? 1) as number;

    const flatten = (arr: any[], currentDepth: number): any[] => {
      return arr.reduce((acc: any[], val: any) => {
        if (Array.isArray(val) && currentDepth < depthNum) {
          acc.push(...flatten(val, currentDepth + 1));
        } else {
          acc.push(val);
        }
        return acc;
      }, []);
    };

    return flatten(this as any[], 0);
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function <T, S extends T>(
    this: T[],
    predicate: (value: T, index: number, obj: T[]) => boolean,
    thisArg?: any
  ): T | undefined {
    if (this == null) throw new TypeError('"this" is null or undefined');
    if (typeof predicate !== "function") throw new TypeError("predicate must be a function");
 
    for (let i = 0; i < this.length; i++) {
      if (predicate.call(thisArg, this[i], i, this)) return this[i];
    }
 
    return undefined;
  };
}
 
if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function <T>(
    this: T[],
    predicate: (value: T, index: number, obj: T[]) => unknown,
    thisArg?: any
  ): number {
    if (this == null) throw new TypeError('"this" is null or undefined');
    if (typeof predicate !== "function") throw new TypeError("predicate must be a function");
 
    for (let i = 0; i < this.length; i++) {
      if (predicate.call(thisArg, this[i], i, this)) return i;
    }
 
    return -1;
  };
}
 
if (!Array.prototype.fill) {
  Array.prototype.fill = function <T>(
    this: T[],
    value: T,
    start?: number,
    end?: number
  ): T[] {
    if (this == null) throw new TypeError('"this" is null or undefined');
 
    const len = this.length;
    const relStart = start ?? 0;
    const relEnd = end ?? len;
 
    let k = relStart < 0 ? Math.max(len + relStart, 0) : Math.min(relStart, len);
    const final = relEnd < 0 ? Math.max(len + relEnd, 0) : Math.min(relEnd, len);
 
    while (k < final) {
      this[k++] = value;
    }
 
    return this;
  };
}
