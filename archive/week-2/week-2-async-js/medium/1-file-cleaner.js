const fs = require("fs").promises;

async function cleanFile(fileName) {
    try {
        const content = await fs.readFile(fileName, "utf-8");
        const cleanedContent = content.replace(/\s+/g, " ").trim();
        await fs.writeFile(fileName, cleanedContent);
        console.log(`File ${fileName} has been cleaned`);
    } catch (error) {
        console.log("Error", error.message);
    }
}

const fileName = "a.txt";
cleanFile(fileName);
