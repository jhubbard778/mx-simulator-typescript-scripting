import { resolve } from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
    resolve: {
        alias: {
            "@": resolve(__dirname, './src'),
            "@test": resolve(__dirname, './tests')
        }
    },
    test: {
        globals: true,
        setupFiles: ['./tests/setup.ts'],
        typecheck: {
            tsconfig: './tests/tsconfig.json',
        }
    }
});