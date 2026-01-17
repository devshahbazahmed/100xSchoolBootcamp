const fs = require("fs");
const { Command } = require("commander");
const program = new Command();

program
    .name("counter")
    .version("0.8.0")
    .description("CLI to do file based tasks");

program
    .command("count")
    .description("Count the number of lines in the file")
    .argument("<file>", "file to count")
    .action((file) => {
        fs.readFile(file, "utf-8", function (err, data) {
            if (err) {
                console.error(err);
            } else {
                const lines = data.split("\n").length;
                console.log(`There are ${lines} lines in ${file}`);
            }
        });
    });

program.parse();
