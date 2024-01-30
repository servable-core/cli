import chalk from "chalk"

export default props => {
    const { title, subTitle, toolbox } = props
    // toolbox.log(`\n\n\n`)
    // toolbox.log(chalk.green(`\n......................................................................`))
    toolbox.log(chalk.green(`\n${title}`))
    toolbox.log(chalk.italic(`${subTitle}`))
    toolbox.log(chalk.green(`....................................`))
    toolbox.log(``)
    // toolbox.log(``)
}
