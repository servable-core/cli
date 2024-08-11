import { readdir } from 'fs/promises'

export default async source =>
    (await readdir(source, { withFileTypes: true }))
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
