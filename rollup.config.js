import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import gzipPlugin from 'rollup-plugin-gzip'


export default {
    input: 'lib/index.js',
    output: {
        file: 'dist/index.js',
        format: 'es'
    },
    plugins: [resolve(), terser(), gzipPlugin()]
}
