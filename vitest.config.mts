import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

const dirname = import.meta.dirname;

export default defineConfig({
    resolve: {
        alias: {
            '@': resolve(dirname, './src'),
            '@test': resolve(dirname, './tests'),
        },
    },
    test: {
        globals: true,
        setupFiles: ['./tests/setup.ts'],
        typecheck: {
            tsconfig: './tests/tsconfig.json',
        },
        coverage: {
            include: ['src/**/*.{js,ts}'],
            exclude: ['src/**/polyfills/*', 'src/**/entry.ts'],
        },
    },
});
