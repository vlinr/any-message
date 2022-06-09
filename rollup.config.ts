import babel from 'rollup-plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'
import resolve from '@rollup/plugin-node-resolve'
import typescript from 'rollup-plugin-typescript2'
import filesize from 'rollup-plugin-filesize'
import serve from 'rollup-plugin-serve'
const env = process.env.NODE_ENV
const isProdEnv = env === 'production'
export default {
  input: './src/index.ts', //入口文件
  output: {
    file: './lib/any-message.min.js', //打包后的存放文件
    format: 'umd', //输出格式 amd es6 iife umd cjs
    name: 'Amessage',
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
    !isProdEnv
      ? serve({
          open: true,
          openPage: '/src/demo/index.html', // 默认打开html的路径
          port: 3000,
          contentBase: '', // 默认以当前文件为路径启动服务
        })
      : null,
  ],
  external: '_tests_',
}
