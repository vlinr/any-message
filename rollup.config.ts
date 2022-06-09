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
    input: './src/index.ts', //入口文件
    output: {
        file: isProdEnv ? './lib/index.js' : './dist/any-message.min.js', //打包后的存放文件
        format: exec[1], //输出格式 amd es6 iife umd cjs
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
