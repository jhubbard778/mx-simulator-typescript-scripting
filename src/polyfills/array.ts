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