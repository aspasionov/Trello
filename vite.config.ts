import path from 'path'
import { Alias, defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

import * as tsconfig from './tsconfig.json'

function readAliasFromTsConfig(): Alias[] {
    const pathReplaceRegex = new RegExp(/\/\*$/, '')
    return Object.entries(tsconfig.compilerOptions.paths).reduce(
        (aliases, [fromPaths, toPaths]) => {
            const find = fromPaths.replace(pathReplaceRegex, '')
            const toPath = toPaths[0].replace(pathReplaceRegex, '')
            const replacement = path.resolve(__dirname, toPath)
            aliases.push({ find, replacement })
            return aliases
        },
        [] as Alias[]
    )
}

export default defineConfig({
    resolve: {
        alias: readAliasFromTsConfig(),
    },
    plugins: [reactRefresh()],
})
