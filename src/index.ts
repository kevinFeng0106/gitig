import cac from "cac";
import fetch from "node-fetch";
import fs from "fs";

const cli = cac("gitig");

const genTypeWhiteList = ["frontend"];

const RAW_FILE_URL = "https://gitee.com/lord-moon/gitig-template/raw/master";

cli
  .command("gen <type>", "Create a new .gitignore file with the specified type")
  .action(async (type) => {
    console.log("[gitig]: Generating .gitignore file with type " + type + " ...");

    if(!genTypeWhiteList.includes(type)) {
      throw new Error("[gitig]: Invalid type, please check the type list.");
    };

    const targetRawFileUrl = `${RAW_FILE_URL}/${type}/general_gitignore.txt`;
    console.log(`[gitig]: Downloading .gitignore file from ${targetRawFileUrl} ...`);

    const reponse = await fetch(targetRawFileUrl, {
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    });
    const text = await reponse.text();

    const cwd = process.cwd();
    console.log("[gitig]: Writing .gitignore file to " + cwd + " ...");
    fs.writeFileSync(`${cwd}/.gitignore`, text);
  });

cli.help();
cli.parse();