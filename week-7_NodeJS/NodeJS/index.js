// import chalk from "chalk";

// console.log(chalk.blue("Hello, world!"));
// console.log(chalk.red.bold("This is an error message."));
// console.log(chalk.green.underline("This is a success message."));
// console.log(chalk.yellow("This is new warn message"));
const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const program = new Command();

console.log(__dirname);
console.log(__dirname + "/index.js");
console.log(path.join(__dirname, "/index.js"));
const filePath = path.join(__dirname, "a.txt");

program
  .name("count")
  .description("Count the number of lines in a file")
  .version("0.8.0");

program
  .command("count")
  .description("Count the number of lines in a file")
  .argument("<file>", "file to count")
  .action((file) => {
    fs.readFile(file, "utf8", (err, data) => {
      if (err) console.error("Error: ", err);
      else {
        const lines = data.split("\n").length;
        console.log(`There are ${lines} lines in the file`);
      }
    });
  });

program.parse();

fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
  } else {
    console.log(data);
  }
});

// fs.readFile("as.txt", "UTF-8", (err, data) => {
//   if (err) {
//     console.log(chalk.red.bold(err));
//   } else {
//     console.log(chalk.bold.blue(data));
//   }
// });
