import chalk from "chalk"
import quotePlain from "../quotePlain.js"

export default props => {
    const { title, subTitle, toolbox } = props
    let _sub = subTitle
    if (!subTitle) {
        _sub = quotePlain()
    }

    toolbox.log(`\n\n\n`)
    // toolbox.log(chalk.red(`\n......................................................................`))
    toolbox.log(chalk.red(`\n${title}`))
    toolbox.log(chalk.italic(`${_sub}`))
    toolbox.log(chalk.red(`.......................................`))
    toolbox.log(``)
    // toolbox.log(``)
}
