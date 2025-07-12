#!/usr/bin/env node

import cac from "cac";
import fs from "fs";
import { execSync } from "child_process";

const cli = cac("gitig");

const genTypeList = ["frontend", "common"];

const RAW_FILE_URL = "https://raw.githubusercontent.com/kevinFeng0106/gitig-template/refs/heads/main";

cli
  .command("gen <type>", "Create a new .gitignore file with the specified type")
  .action(async (type) => {
    console.log("[gitig]: Generating .gitignore file with type " + type + " ...");

    if(!genTypeList.includes(type)) {
      throw new Error("[gitig]: Invalid type, please check the type list.");
    };

    const targetRawFileUrl = `${RAW_FILE_URL}/${type}/general_gitignore.txt`;
    console.log(`[gitig]: Downloading .gitignore file from ${targetRawFileUrl} ...`);

    const fileContent = execSync(`curl -s ${targetRawFileUrl}`);

    const cwd = process.cwd();
    console.log("[gitig]: Writing .gitignore file to " + cwd + " ...");
    fs.writeFileSync(`${cwd}/.gitignore`, fileContent);
  });

cli.help();
cli.parse();