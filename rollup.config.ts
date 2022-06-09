import babel from 'rollup-plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';
import filesize from 'rollup-plugin-filesize';
const env = process.env.NODE_ENV;
const exec = env.split('_');
const isProdEnv = exec[0] === 'production';
export default {
    input: './src/index.ts',
    output: {
        file: isProdEnv ? './lib/index.js' : './dist/any-message.min.js',
        format: exec[1],
        name: 'message',
    },
    plugins: [
        commonjs(),
        resolve(),
        typescript(),
        babel({
            exclude: 'node_modules/**',
        }),
        isProdEnv && terser(),
        filesize(),
    ],
    external: '_tests_',
};
