import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import path from 'path';
import { typescriptPaths } from 'rollup-plugin-typescript-paths';
import { viteExternalsPlugin } from 'vite-plugin-externals';

export default defineConfig({
    plugins: [
        viteExternalsPlugin({
            // don't bundle these in the output. Let the app which hosts this provide the package.
            react: 'React',
            'react-dom': 'ReactDOM',
        }),
    ],
    resolve: {
        alias: [
            {
                find: '~',
                replacement: path.resolve(__dirname, './src'),
            },
        ],
    },
    esbuild: {
        minify: true,
    },
    build: {
        manifest: true,
        minify: true,
        reportCompressedSize: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            fileName: 'main',
            formats: ['es', 'cjs'],
        },
        rollupOptions: {
            external: [],
            plugins: [
                typescriptPaths({
                    preserveExtensions: true,
                }),
                typescript({
                    sourceMap: false,
                    declaration: true,
                    outDir: 'dist',
                }),
            ],
        },
    },
});