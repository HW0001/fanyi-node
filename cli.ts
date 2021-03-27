import * as commander from "commander";
import { translate } from "./index";

const program = new commander.Command();
program
  .version("0.1.0")
  .arguments("<word>")
  .action((word: string) => {
    translate(word);
  });

program.parse(process.argv);
