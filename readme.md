# MX Simulator TypeScript Scripting

A template for writing MX Simulator scripts in TypeScript, bundled down to ES5-compatible JavaScript for Duktape.

Clone this repo as a starting point for your own script, write your logic in `src/main.ts`, and build it into a single JS file ready to drop into MX Simulator.

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

## Project Structure

- **`src/main.ts`** — the entry point. This is where execution starts. Import your other modules here and write your top-level logic.
- **`src/types/mx.d.ts`** — type declarations for MX Simulator's global `mx` API.
- **`rollup.config.mjs`** — build configuration. You can customize the output file name here:

```js
output: {
  file: 'dist/your-script-name.js', // change this to whatever you need
  ...
}
```

## Using Plain JavaScript

Everything in this setup works with plain `.js` files too — you don't have to use TypeScript. To convert `main.ts` to JavaScript:

1. Rename `src/main.ts` to `src/main.js`
2. Remove all type annotations (`: string`, `: number`, `interface`, `type`, etc.)
3. Update the `input` field in `rollup.config.mjs`:

```js
input: 'src/main.js',
```

Rollup and Babel will still bundle and transpile everything down to ES5 the same way — TypeScript is purely opt-in.

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