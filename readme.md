# MX Simulator TypeScript Scripting


A template for writing MX Simulator scripts in TypeScript or JavaScript, bundled down to ES5-compatible JavaScript for Duktape.
 
Clone this repo as a starting point for your own script, write your logic in `src/main.ts`, and build it into a single JS file ready to drop into MX Simulator. Includes type declarations for the `mx` and `mxserver` APIs, giving you full autocomplete and inline documentation whether you're using TypeScript or JavaScript.


## Prerequisites

- [Node.js & npm](https://nodejs.org/) — install this first if you don't have it. Verify with:

```bash
node -v
npm -v
```

## Getting Started

1. Clone the repo:

```bash
git clone https://github.com/jhubbard778/mx-simulator-typescript-scripting
cd mx-simulator-typescript-scripting
```

2. Install dependencies:

```bash
npm install
```

3. Write your script in `src/main.ts`

4. Build:

```bash
npm run build
```

This will bundle everything into a single output file ready to use in MX Simulator.

## Minification

Minification is optional and is only applied during a production build. Use `npm run build` during development for readable output, and `npm run build:prod` when you're ready to release:

```bash
npm run build:prod
```

This produces a minified output file via `@rollup/plugin-terser`, which is already included in the config.

## Using Plain JavaScript

Everything in this setup works with plain `.js` files too — you don't have to use TypeScript. To convert `main.ts` to JavaScript:

- Rename `src/main.ts` to `src/main.js`

Rollup and Babel will still bundle and transpile everything down to ES5 the same way — TypeScript is purely opt-in.

## Project Structure

- **`src/main.ts`** — where your script logic lives. This is the file you work in.
- **`src/entry.ts`** — the Rollup entry point. You don't need to touch this — it automatically imports polyfills and then your `main.ts`. This is what `rollup.config.mjs` points at.
- **`src/polyfills/`** — polyfills for built-in methods that Duktape doesn't support natively. Each file polyfills a specific group (e.g. `array.ts`, `object.ts`). They are imported automatically via `entry.ts`.
- **`src/types/mx.d.ts`** — type declarations for MX Simulator's global `mx` API.
- **`src/types/mxserver.d.ts`** — type declarations for MX Simulator's global `mxserver` API.
- **`rollup.config.mjs`** — build configuration. You can customize the output file name and location here:
```js
output: {
  file: 'dist/your-script-name.js', // change this to whatever you need
  ...
}
```
 
You can also point the output directly to your MX Simulator scripts/track folder so the file is ready to use immediately after every build, without manually copying it over:
 
```js
// Linux
output: {
  file: '/home/username/.mxsimulator/my-track/frills.js',
  ...
}
 
// Windows
output: {
  file: 'C:/Users/username/AppData/local/MX Simulator/my-track/frills.js',
  ...
}
```

## Adding Polyfills
Polyfills are located in `src/polyfills/` and are automatically included in every build via `src/entry.ts` — you don't need to import them manually in your code.
 
To add a new polyfill:
 
1. Create or edit a file in `src/polyfills/` (e.g. `src/polyfills/array.ts`):
```ts
// src/polyfills/array.ts
if (!Array.prototype.includes) {
    Array.prototype.includes = function(value: any): boolean {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === value) return true;
        }
        return false;
    };
}
```
 
2. Import it in `src/entry.ts`:
```ts
// src/entry.ts
import './polyfills/array';
import './polyfills/object'; // add more as needed
import './main';
```
 
3. Add the corresponding lib entry to `tsconfig.json` so TypeScript knows the method is available:
```json
"lib": [
    "ES5",
    "ES2016.Array.Include" // only add this once the polyfill is written and imported
]
```
 
Only add lib entries for methods you have actually polyfilled — this ensures TypeScript won't suggest methods that don't exist in Duktape at runtime.

## ES5 / Duktape Considerations

MX Simulator uses [Duktape](https://duktape.org/), a lightweight ES5-compatible engine. Most modern JavaScript and TypeScript will transpile down fine, but there are some features that **cannot be polyfilled or transpiled** and should be avoided:

### Avoid These

| Feature | Why |
|---|---|
| `Proxy` / `Reflect` | Cannot be transpiled — requires engine-level support |
| `WeakMap` / `WeakSet` | No reliable ES5 polyfill; avoid in game scripts |
| `Symbol` | Partially polyfillable but can cause subtle issues |
| `async` / `await` | Requires `Promise`, which Duktape doesn't natively support |
| `Promise` | Not available unless the game exposes it |
| Generators (`function*`) | Not safely transpilable to ES5 |
| `eval` with dynamic imports | Unpredictable in a sandboxed engine |
| DOM / browser APIs | Not available — only what `mx` exposes |

### Fine to Use

These are handled by Babel's transpilation and will work correctly:

- Arrow functions (`=>`)
- `class` syntax
- `const` / `let`
- Template literals
- Destructuring
- Default parameters
- Spread / rest operators
- `for...of` loops (over arrays)
- Modules (`import` / `export`) — Rollup bundles these away

### TypeScript-Specific

- Interfaces, types, and generics are erased at compile time — zero runtime cost
- Enums compile to plain objects, which are fine
- `readonly` and access modifiers (`private`, `public`) are compile-time only

### General Tips

- Keep logic synchronous — there's no event loop or async runtime
- Avoid large third-party npm packages; most assume a browser or Node environment and will reference unavailable globals

## Using NPM Packages

Using npm packages in Duktape scripts is generally not advised. Most packages are written for browser or Node.js environments and will reference globals like window, document, process, or globalThis that simply don't exist in Duktape — causing runtime errors that can be hard to debug.

If you do find a package that is pure vanilla JavaScript with no browser or Node dependencies, it may work, but you will likely still need to manually write polyfills for any modern built-in methods it relies on (see Adding Polyfills). Using core-js for this is not recommended either — it is also built targeting browser and Node environments and can introduce the same DOM-dependent code that causes issues in Duktape.

The safest approach is to implement the logic you need directly in your script rather than relying on npm packages.

For example, using the `bad-words` package requires `Array.prototype.includes`, so you need to create that polyfill and then add it to `entry.ts`.

> Note that the `includes` polyfill already exists in this template. This is for example purposes.

```ts
import { Filter } from "bad-words";
 
const chatFilter = (slot: number, message: string): Bit => {
    const filter = new Filter();
    if (filter.isProfane(message)) {
      mxserver.send(slot, "You cannot use profanity in this server!");
      return 1;
    }
    return chatFilterPrev(slot, message);
}
 
var chatFilterPrev = mxserver.chat_handler;
mxserver.chat_handler = chatFilter;
```

```ts
// src/polyfills/array.ts
if (!Array.prototype.includes) {
    Array.prototype.includes = function (searchElement: any, fromIndex?: number): boolean {
        for (let i = fromIndex ?? 0; i < this.length; i++) {
            if (this[i] === searchElement) return true;
        }

        return false;
    }
}
```

```ts
// src/entry.ts
import "./polyfills/array";
```
 
## Testing
 
This template includes [Vitest](https://vitest.dev/) for testing your script logic. Tests run in Node rather than Duktape, so they're best suited for testing pure logic in isolation rather than in-engine behaviour.
 
### Node Version
 
Vitest requires a recent version of Node. If you're using [nvm](https://github.com/nvm-sh/nvm), a `.nvmrc` file is included in the repo — just run:
 
```bash
nvm use
```
 
To install and use the correct version.
 
### Running Tests
 
```bash
npm run test
```
 
Or to run once without watch mode:
 
```bash
npm run test --run
```
 
### Writing Tests
 
Place your test files in the `tests/` folder. The `mx` and `mxserver` globals are mocked in `tests/setup.ts` so they're available in all tests without importing anything.

A basic test looks like:
 
```ts
// tests/my-feature.test.ts
import { myFunction } from '../src/my-feature';
 
describe('myFunction', () => {
    it('should do something', () => {
        expect(myFunction()).toBe(true);
    });
});
```
 
### Mocking the MX API
 
The `tests/setup.ts` file mocks the game's global API so your logic can be tested without the game running.
Add any additional `mx` or `mxserver` methods you need to mock here as you use them. You can also override mocks per test using `vi.mocked()`:
 
```ts
it('should handle empty running order', () => {
    vi.mocked(mx.get_running_order).mockReturnValueOnce([]);
    // ...
});
```
 
### Tsconfig
 
The `tests/` folder has its own `tsconfig.json` that extends the root config but targets `ESNext` instead of `ES5`, since tests run in Node and don't need to be transpiled down for Duktape. This means you can use modern syntax freely in your tests.

## Auto-Build on Save

Instead of running `npm run build` manually every time, you can have it rebuild automatically whenever you save a file.

### Option 1: Rollup Watch Mode (any editor)

Run this in your terminal and leave it running:

```bash
npm run watch
```

Make sure you have the watch script in your `package.json`:

```json
"scripts": {
  "build": "rollup --config",
  "watch": "rollup --config --watch"
}
```

Rollup will detect file changes and rebuild instantly.

### Option 2: VS Code Task on Save

If you're using VS Code you can make it run the build automatically on every save without keeping a terminal open yourself.

1. Create `.vscode/tasks.json` in your project root:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Watch & Build",
      "type": "shell",
      "command": "npm run watch",
      "isBackground": true,
      "problemMatcher": [],
      "runOptions": {
        "runOn": "folderOpen"
      }
    }
  ]
}
```

2. When VS Code asks *"This folder has tasks configured to run automatically"*, click **Allow**.

The watch task will start automatically whenever you open the project folder and rebuild on every save.

### Option 3: VS Code + Trigger Task on Save Extension

If you want more control, install the [Trigger Task on Save](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.triggertaskonsave) extension, then add this to your `.vscode/settings.json`:

```json
{
  "triggerTaskOnSave.tasks": {
    "Watch & Build": ["src/**/*.ts"]
  }
}
```

This only triggers the build when files inside `src/` change, ignoring unrelated edits.