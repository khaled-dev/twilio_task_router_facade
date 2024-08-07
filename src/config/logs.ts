import chalk from "chalk";

export default class Logs {
  public static log = (args: string) => this.info(args);
  public static info = (args: string) =>
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
      chalk.blueBright(args),
    );
  public static warning = (args: string) =>
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`),
      chalk.yellowBright(args),
    );
  public static error = (args: string) =>
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
      chalk.redBright(args),
    );
}
