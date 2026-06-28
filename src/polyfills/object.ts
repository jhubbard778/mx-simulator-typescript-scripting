if (!Object.entries) {
  Object.entries = function <T>(obj: { [s: string]: T } | ArrayLike<T>): [string, T][] {
    return Object.keys(obj).map(key => [key, (obj as any)[key]] as [string, T]);
  };
}

if (!Object.values) {
  Object.values = function <T>(obj: { [s: string]: T } | ArrayLike<T>): T[] {
    return Object.keys(obj).map(key => (obj as any)[key]);
  };
}

if (!Object.getOwnPropertyDescriptors) {
  Object.getOwnPropertyDescriptors = function <T>(o: T): { [P in keyof T]: TypedPropertyDescriptor<T[P]> } & { [x: string]: PropertyDescriptor } {
    return (Object.getOwnPropertyNames(o) as (keyof T)[]).reduce((acc, key) => {
      acc[key] = Object.getOwnPropertyDescriptor(o, key) as TypedPropertyDescriptor<T[typeof key]>;
      return acc;
    }, {} as any);
  };
}

if (!Object.fromEntries) {
  Object.fromEntries = function <T = any>(entries: Iterable<readonly [PropertyKey, T]>): { [k: string]: T } {
    return [...entries as any].reduce((acc, [key, value]) => {
      acc[key as string] = value;
      return acc;
    }, {} as { [k: string]: T });
  };
}