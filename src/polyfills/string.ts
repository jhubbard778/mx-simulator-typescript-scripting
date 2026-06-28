if (!String.prototype.trimStart) {
  String.prototype.trimStart = function (): string {
    return this.replace(/^\s+/, '');
  };
}

if (!String.prototype.trimEnd) {
  String.prototype.trimEnd = function (): string {
    return this.replace(/\s+$/, '');
  };
}