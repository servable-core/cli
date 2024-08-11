import fs from "fs"
import Promise from "bluebird"

export default async (path) => {
    return new Promise(function (resolve, reject) {
        fs.exists(path, function (exists) {
            resolve(exists)
        })
    })
}
