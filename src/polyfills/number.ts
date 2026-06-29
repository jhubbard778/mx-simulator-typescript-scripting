if (!Number.EPSILON) {
  Object.defineProperty(Number, 'EPSILON', {
    value: Math.pow(2, -52),
    configurable: false,
    writable: false,
  });
}

if (!Number.MAX_SAFE_INTEGER) {
    Object.defineProperty(Number, 'MAX_SAFE_INTEGER', {
        value: Math.pow(2, 53) - 1,
        configurable: false,
        writable: false
    });
}

if (!Number.MIN_SAFE_INTEGER) {
    Object.defineProperty(Number, 'MIN_SAFE_INTEGER', {
        value: -1 * (Math.pow(2, 53) - 1),
        configurable: false,
        writable: false
    });
}

if (!Number.isFinite) {
    Number.isFinite = function(value: unknown): boolean {
        return typeof value === 'number' && isFinite(value);
    }
}

if (!Number.isInteger) {
  Number.isInteger = function(value: unknown): boolean {
    return Number.isFinite(value)
        && Math.floor(value as number) === value;
  };
}

if (!Number.isSafeInteger) {
    Number.isSafeInteger = function(value: unknown): boolean {
        return Number.isInteger(value) && Math.abs(value as number) <= Number.MAX_SAFE_INTEGER;
    }
}

if (!Number.isNaN) {
    Number.isNaN = function(value: unknown): boolean {
        return typeof value === 'number' && isNaN(value);
    }
}

if (!Number.parseFloat) {
    Number.parseFloat = parseFloat;
}

if (!Number.parseInt) {
    Number.parseInt = parseInt;
}