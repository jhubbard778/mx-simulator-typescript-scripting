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
    Number.isFinite = function(value: any): boolean {
        return typeof value === 'number' && isFinite(value);
    }
}

if (!Number.isInteger) {
  Number.isInteger = function(value: any): boolean {
    return Number.isFinite(value)
        && Math.floor(value) === value;
  };
}

if (!Number.isSafeInteger) {
    Number.isSafeInteger = function(value: any): boolean {
        return Number.isInteger(value) && Math.abs(value) <= Number.MAX_SAFE_INTEGER;
    }
}

if (!Number.parseFloat) {
    Number.parseFloat = parseFloat;
}

if (!Number.parseInt) {
    Number.parseInt = parseInt;
}