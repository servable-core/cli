import chalk from "chalk"


export default props => {
    const { title, subTitle, toolbox } = props

    toolbox.log(chalk.yellow(`\n${title} --------------`))
    toolbox.log(chalk.italic(`${subTitle}\n`))
}
